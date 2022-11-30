<template>
  <div class="text-center w-full">
    <p v-if="selfUser.pos && selfUser.pos.lat && selfUser.pos.lng && destination.pos && destination.pos.lat && destination.pos.lng && destination.time" >
      Miam à
      <input @change="changeDestination()" type="time" id="picker" name="picker" v-model="destination.time" />.
      Tu dois partir {{ selfDepartTime }}.
    </p>
    <p v-else-if="selfUser.pos && selfUser.pos.lat && selfUser.pos.lng">
      {{ selfDepartTime }}
      <input @change="changeDestination()" v-if="destination.pos && destination.pos.lat && destination.pos.lng" type="time" id="picker" name="picker" v-model="destination.time" />.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    selfUser: null,
    destination: null,
  },
  data() {
    return {
      socket: this.$socket.get()
    }
  },
  computed: {
    selfDistanceKm() {
      let distanceKm = null;
      if (this.selfUser.marker === null || (this.selfUser.marker && this.selfUser.marker.pos === null) ||
         (this.selfUser.marker && this.selfUser.marker.pos && (this.selfUser.marker.pos.lat === null || this.selfUser.marker.pos.lng === null))
        ) {
          distanceKm = this.$helpers.getDistance(
          this.selfUser.pos.lat,
          this.selfUser.pos.lng,
          this.destination.pos.lat,
          this.destination.pos.lng
        );
      } else {
        const distance1 = this.$helpers.getDistance(
          this.selfUser.pos.lat,
          this.selfUser.pos.lng,
          this.selfUser.marker.pos.lat,
          this.selfUser.marker.pos.lng
        );
        const distance2 = this.$helpers.getDistance(
          this.selfUser.marker.pos.lat,
          this.selfUser.marker.pos.lng,
          this.destination.pos.lat,
          this.destination.pos.lng
        );
        distanceKm = distance1 + distance2;
      }
      return Number.parseFloat(distanceKm).toFixed(3);
    },
    selfDepartTime() {
      const monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Août",
                          "Septembre", "Octobre", "Novembre", "Décembre"];
      try {
        // temps de trajet = distance/vitesse - la vitesse est définit à 5km/h -> donne un pourcentage d'heure
        const travelTimePercent =  this.selfDistanceKm/5;
        //transformation en minute
        const travelTimeMinute = Math.round(travelTimePercent*60);
        //Récupération de l'heure dans l'objet destination - format H:i -> parse par ":" pour avoir un tableau
        const destinationTime = this.destination.time.split(':');
        const destinationHour = destinationTime[0];
        const destinationMinute = destinationTime[1];
        const destinationDatetime = new Date();
        destinationDatetime.setHours(destinationHour, destinationMinute, 0, 0);
        //calcul du depart : créer une nouvelle date et lui set comme timestamp celle de la date d'arrivé moins le timestamp du trajet
        const departureDateTime = new Date();
        departureDateTime.setTime(destinationDatetime.getTime()-(travelTimeMinute*60000))
        //return Heure h minute avec le 0 qui se met s'il n'y a que un digit pour les minutes
        const today = new Date();
        const returnDate = !(departureDateTime.getMonth() === today.getMonth() && departureDateTime.getDate() === today.getDate()) ?
              `le ${departureDateTime.getDate()} ${monthName[departureDateTime.getMonth()]} ` : '';
        const returnTime = `à ${departureDateTime.getHours()}h${String(departureDateTime.getMinutes()).padStart(2, "0")}`
        return returnDate + returnTime;
      } catch (e) {
        console.error(e);
        if (this.destination.pos === null || (this.destination.pos && (this.destination.pos.lat === null || this.destination.pos.lng === null))) {
          return 'Veuillez définir un point de rendez-vous!';
        } else if (this.destination.time === null ) {
          return 'Veuillez définir une heure de rendez-vous!';
        }
      }
    },
  },
  methods: {
    changeDestination() {
      this.$socket.changeDestination(this.socket, this.destination);
    },
  }
};
</script>

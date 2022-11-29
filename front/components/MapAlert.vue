<template>
  <div class="text-center w-full">
    <p v-if="selfPosition.lat && selfPosition.lng && destination.lat && destination.lng && destination.time" >Miam à {{ destination.time }}. Tu dois partir {{ selfDepartTime }}</p>
    <p v-else-if="selfPosition.lat && selfPosition.lng">{{ selfDepartTime }}</p>
  </div>
</template>

<script>
export default {
  props: {
    selfPosition: null,
    selfMarker: null,
    destination: null,
  },
  computed: {
    selfDistanceKm() {
      let distanceKm = null;
      if ([this.selfMarker.lat,this.selfMarker.lng].includes(null)) {
          distanceKm = this.$helpers.getDistance(
          this.selfPosition.lat,
          this.selfPosition.lng,
          this.destination.lat,
          this.destination.lng
        );
      } else {
        const distance1 = this.$helpers.getDistance(
          this.selfPosition.lat,
          this.selfPosition.lng,
          this.selfMarker.lat,
          this.selfMarker.lng
        );
        const distance2 = this.$helpers.getDistance(
          this.selfMarker.lat,
          this.selfMarker.lng,
          this.destination.lat,
          this.destination.lng
        );
        distanceKm = distance1 + distance2;
      }
      return Number.parseFloat(distanceKm).toFixed(3);
    },
    selfDepartTime() {
      const monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Août",
                          "Septemnre", "Octobre", "Novembre", "Décembre"];
      if (![this.selfPosition.lat,this.selfPosition.lng, this.destination.lat, this.destination.lng, this.destination.time].includes(null)) {
          // temps de trajet = distance/vitesse - la vitesse est définit à 5km/h -> donne un pourcentage d'heure
          const travelTimePercent =  this.selfDistanceKm/5;
          //transformation en minute
          const travelTimeMinute = Math.round(travelTimePercent*60);

          //Récupération de l'heure dans l'objet destination - format Hhi -> parse par "h" pour avoir un tableau
          const destinationTime = this.destination.time.split('h');
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
                            `le ${departureDateTime.getDate()} ${monthName[departureDateTime.getMonth()]}` : '';
          const returnTime = `à ${departureDateTime.getHours()}h${String(departureDateTime.getMinutes()).padStart(2, "0")}`
          return returnDate + returnTime;
      } else if ([this.destination.lat, this.destination.lng].includes(null)) {
          return 'Veuillez définir un point de rendez-vous'
      }
    },
  },
};
</script>

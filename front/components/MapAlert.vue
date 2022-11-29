<template>
  <div class="text-center w-full">
    <p>Miam à {{ destination.time }}. Tu dois partir à {{ selfDepartTime }}</p>
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
      const distanceKm = distance1 + distance2;
      return Number.parseFloat(distanceKm).toFixed(3);
    },
    selfDepartTime() {
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
      return `${departureDateTime.getHours()}h${String(departureDateTime.getMinutes()).padStart(2, "0")}`
    }
  },
};
</script>

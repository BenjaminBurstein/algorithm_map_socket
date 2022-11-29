
export default ({ }, inject) => {
    inject("helpers", {
        getDistance(latitude1,longitude1, latitute2, longitude2) {
            const rayonTerre = 6371;
            const lat1 = Math.PI*latitude1/180;
            const long1 = Math.PI*longitude1/180;
            const lat2 = Math.PI*latitute2/180;
            const long2 = Math.PI*longitude2/180;
            const longDelta = long2 - long1;
            const distanceAng = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(longDelta));
            console.log(distanceAng);
            const distance = distanceAng*rayonTerre;
            return distance;
        }
    });
};

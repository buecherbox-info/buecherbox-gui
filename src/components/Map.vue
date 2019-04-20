<template>
    <Mapbox :access-token="accessToken"
            :map-options="options"
            @map-load="initMap"
            @map-click="clicked"
    />
</template>

<script>
  import Mapbox from 'mapbox-gl-vue';
  import MapboxGl from 'mapbox-gl';
  import Vue from 'vue';

  import Infobox from './Infobox';

  export default {
    name: "Map",
    components: {
      Mapbox
    },
    data() {
      return {
        map: null,
        // https://account.mapbox.com/
        accessToken: "***REMOVED***",
        options: {
          style: 'mapbox://styles/mapbox/light-v9',
          center: [50, 50]
        },
        targets: [
          {lng: 12.259568217916211, lat: 50.599617329304294},
          {lng: 12.86608547341038, lat: 50.85812957593282},
          {lng: 12.829225087508064, lat: 50.79433207522962},
          {lng: 13.082087334814588, lat: 50.83858048449676},
          {lng: 12.96929455394428, lat: 50.782680788490666}
        ]
      };
    },
    methods: {
      initMap(map) {
        this.map = map;
        this.targets.forEach((target) => {
          this.addPopUp(this.map, target);
        });
      },
      clicked(map, event) {
        this.addPopUp(map, event.lngLat);
      },
      addPopUp(map, coordinates) {
        new MapboxGl.Popup()
          .setLngLat(coordinates)
          .setHTML("<div id='infobox-wrapper'></div>")
          .addTo(map);


        const infoBox = Vue.extend(Infobox);
        const box = new infoBox();
        box.$props.map = map;
        box.$props.coordinates = coordinates;
        box.$mount('#infobox-wrapper');
      }
    }
  }
</script>

<style scoped>
    #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>

<template>
    <Mapbox :access-token="accessToken"
            :map-options="options"
            @map-load="initMap"
    />
</template>

<script>
  import Mapbox from 'mapbox-gl-vue';
  import MapboxGl from 'mapbox-gl';
  import Vue from 'vue';
  import {mapState} from 'vuex';

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
        }
      };
    },
    computed: {
      ...mapState('BookStorage', ['targets'])
    },
    methods: {
      initMap(map) {
        this.map = map;
        this.targets.forEach((target) => {
          this.addPopUp(this.map, target);
        });
      },
      clicked(map, event) {
        const target = {
          coord: event.lngLat
        };
        this.addPopUp(map, target);
      },
      addPopUp(map, target) {
        const options = {
          closeButton: false,
          closeOnClick: false
        };

        new MapboxGl.Popup(options)
          .setLngLat(target.coord)
          .setHTML("<div id='infobox-wrapper'></div>")
          .addTo(map);


        const infoBox = Vue.extend(Infobox);
        const box = new infoBox();
        box.$props.map = this.map;
        box.$props.target = target;
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

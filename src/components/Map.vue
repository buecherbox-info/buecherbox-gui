<template>
    <Mapbox :access-token="accessToken"
            :map-options="options"
            @map-load="initMap"
            @focusInfobox="focusInfobox"
    />
</template>

<script>
  import Mapbox from 'mapbox-gl-vue';
  import MapboxGl from 'mapbox-gl';
  import Vue from 'vue';
  import {mapState} from 'vuex';

  import {EventBus, EventNames} from "../events";
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
    async mounted() {
      await this.$store.dispatch('BookStorage/getBookBoxInfos');

      EventBus.$on(EventNames.FOCUS_INFOBOX, (data) => {
        this.focusInfobox(data);
      });
    },
    methods: {
      addPopUp(map, target) {
        const options = {
          closeButton: false,
          closeOnClick: false
        };

        const coordinates = {
          lng: target.lng,
          lat: target.lat
        };

        new MapboxGl.Popup(options)
          .setLngLat(coordinates)
          .setHTML("<div id='infobox-wrapper'></div>")
          .addTo(map);


        const infoBox = Vue.extend(Infobox);
        const box = new infoBox();
        box.$props.map = this.map;
        box.$props.target = target;
        box.$mount('#infobox-wrapper');
      },
      clicked(map, event) {
        const target = {
          coordinates: event.lngLat
        };
        this.addPopUp(map, target);
      },
      focusInfobox(coordinates) {
        if (!this.map) return;

        this.map.flyTo({
          center: [
            coordinates.lng,
            coordinates.lat
          ],
          zoom: 15
        });
      },
      initMap(map) {
        this.map = map;
        this.targets.forEach((target) => {
          this.addPopUp(this.map, target);
        });
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

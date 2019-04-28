<template>
  <div id="map"></div>
</template>

<script>
import MapboxGl from 'mapbox-gl'
import Vue from 'vue'
import { mapState } from 'vuex'

import { EventBus, EventNames } from '../events'
import Infobox from './Infobox'
import EditInfo from './EditInfo'
import Messages from '../assets/lang/messages';

export default {
  name: 'Map',
  props: {
    showSidebar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      map: null,
      // https://account.mapbox.com/
      accessToken: '***REMOVED***',
      options: {
        style: 'mapbox://styles/timmepfeife/cjuwcfsz71ddk1fqm520lj59t',
        center: [50, 50]
      },
      showEdit: false
    }
  },
  computed: {
    ...mapState('BookStorage', ['targets']),
    ...mapState('User', ['isLoggedIn'])
  },
  async mounted () {
    this.createMap();

    await this.$store.dispatch('BookStorage/getBookBoxInfos');

    this.initMap();

    EventBus.$on(EventNames.FOCUS_INFOBOX, (data) => {
      this.focusInfobox(data);
    });

    EventBus.$on(EventNames.LOGIN_ROUTE, () => {
      this.$router.push({ path: '/profile' });
    })
  },
  methods: {
    addPopUp (map, target) {
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

      const InfoBoxComponent = Vue.extend(Infobox);
      const box = new InfoBoxComponent();
      box.$props.map = this.map;
      box.$props.target = target;
      box.$mount('#infobox-wrapper');
    },
    clicked (event) {
      new MapboxGl.Popup()
        .setLngLat(event.lngLat)
        .setHTML("<div id='edit-info-wrapper'></div>")
        .addTo(this.map);

      const texts = {
        [Messages.CREATE_NEW_BOOKBOX]: this.$t(Messages.CREATE_NEW_BOOKBOX),
        [Messages.DESCRIPTION]: this.$t(Messages.DESCRIPTION),
        [Messages.LOCATION]: this.$t(Messages.LOCATION),
        [Messages.HINT]: this.$t(Messages.HINT),
        [Messages.LOGIN]: this.$t(Messages.LOGIN)
      };

      const EditInfoComponent = Vue.extend(EditInfo);
      const edit = new EditInfoComponent();
      edit.$state = this.$state;
      edit.$props.lngLat = event.lngLat;
      edit.$props.isLoggedIn = this.isLoggedIn;
      edit.$props.texts = texts;
      edit.$mount('#edit-info-wrapper');
    },
    createMap () {
      MapboxGl.accessToken = this.accessToken;

      this.map = new MapboxGl.Map({
        container: 'map',
        style: 'mapbox://styles/timmepfeife/cjuwcfsz71ddk1fqm520lj59t',
        center: [50, 50],
        zoom: 1.0
      });

      this.map.addControl(new MapboxGl.NavigationControl(), 'top-left');

      this.map.on('click', this.clicked);
    },
    focusInfobox (coordinates) {
      if (!this.map) return;

      this.map.flyTo({
        center: [
          coordinates.lng,
          coordinates.lat
        ],
        zoom: 14
      });
    },
    initMap () {
      this.targets.forEach((target) => {
        this.addPopUp(this.map, target)
      });
    }
  }
};
</script>

<style scoped>
#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
</style>

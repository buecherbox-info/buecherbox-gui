<template>
  <div id="map">
    <div
      id="geocoder"
      class="geocoder"></div>
  </div>
</template>

<script>
import * as BookBox from '../lib/BookBox';
import MapboxGl from 'mapbox-gl'
import Vue from 'vue'
import { mapState } from 'vuex'

import { EventBus, EventNames } from '../events'
import Infobox from './Infobox'
import EditInfo from './EditInfo'
import Messages from '../assets/lang/messages';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

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
        container: 'map',
        style: 'mapbox://styles/timmepfeife/cjv8fr1tq0lck1hp94kgp4fhb',
        center: [50, 50],
        zoom: 1.0
      },
      showEdit: false,
      popups: [],
      editPopup: null
    }
  },
  computed: {
    ...mapState('BookStorage', ['targets']),
    ...mapState('User', ['isLoggedIn', 'userId', 'token']),
    texts () {
      return {
        [Messages.CREATE_NEW_BOOKBOX]: this.$t(Messages.CREATE_NEW_BOOKBOX),
        [Messages.DESCRIPTION]: this.$t(Messages.DESCRIPTION),
        [Messages.LOCATION]: this.$t(Messages.LOCATION),
        [Messages.HINT]: this.$t(Messages.HINT),
        [Messages.LOGIN]: this.$t(Messages.LOGIN),
        [Messages.SAVE]: this.$t(Messages.SAVE)
      }
    },
    locale () {
      return this.$i18n.locale
    }
  },
  watch: {
    targets () {
      this.resetMap();
    },
    locale () {
      this.map.removeControl(this.geocoder);
      this.createGeoCoder();
    }
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
    });

    EventBus.$on(EventNames.SAVE_NEW_BOOKBOX, async (bookbox) => {
      const newBox = await BookBox.postBookBoxInfos(this.userId, this.token, bookbox);
      await this.$store.commit('BookStorage/addTarget', newBox);
      if (this.editPopup) {
        this.editPopup.remove();
        this.editPopup = null;
      }
    });

    EventBus.$on(EventNames.CHANGE_LOCALE, () => {
      this.resetMap();
    });
  },
  beforeDestroy () {
    EventBus.$off(EventNames.SAVE_NEW_BOOKBOX);
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

      const popup = new MapboxGl.Popup(options)
        .setLngLat(coordinates)
        .setHTML("<div id='infobox-wrapper'></div>")
        .addTo(map);

      this.popups.push(popup);

      const InfoBoxComponent = Vue.extend(Infobox);
      const box = new InfoBoxComponent();
      box.$props.map = this.map;
      box.$props.target = target;
      box.$props.texts = this.texts;
      box.$mount('#infobox-wrapper');
    },
    clicked (event) {
      if (this.editPopup) {
        this.editPopup.remove();
      }

      this.editPopup = new MapboxGl.Popup()
        .setLngLat(event.lngLat)
        .setHTML("<div id='edit-info-wrapper'></div>")
        .addTo(this.map);

      const EditInfoComponent = Vue.extend(EditInfo);
      const edit = new EditInfoComponent();
      edit.$state = this.$state;
      edit.$props.lngLat = event.lngLat;
      edit.$props.isLoggedIn = this.isLoggedIn;
      edit.$props.texts = this.texts;
      edit.$mount('#edit-info-wrapper');
    },
    createMap () {
      MapboxGl.accessToken = this.accessToken;

      this.map = new MapboxGl.Map(this.options);

      this.map.addControl(new MapboxGl.NavigationControl());

      this.map.on('contextmenu', this.clicked);
    },
    createGeoCoder () {
      this.geocoder = new MapboxGeocoder({
        accessToken: this.accessToken,
        mapboxgl: MapboxGl,
        language: this.$i18n.locale
      });

      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map))
    },
    focusInfobox (coordinates) {
      if (!this.map) return;

      this.map.flyTo({
        center: [
          coordinates.lng,
          coordinates.lat - 0.01
        ],
        zoom: 14
      });
    },
    initMap () {
      this.targets.forEach((target) => {
        this.addPopUp(this.map, target)
      });
      this.createGeoCoder();
    },
    resetMap () {
      this.popups.forEach((el) => {
        el.remove();
      });
      this.targets.forEach((target) => {
        this.addPopUp(this.map, target)
      });
    }
  }
};
</script>

<style>
@import "../assets/css/components/map.css";
@import "~@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
.geocoder {
  position:absolute;
  z-index:1;
  width: 100%;
  left:50%;
  top:2em;
}
</style>

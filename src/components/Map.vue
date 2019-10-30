<template>
  <div id="map">
    <div
      id="geocoder"
      class="geocoder"
    />
  </div>
</template>

<script>
import Axios from 'axios';
import * as BookBox from '../lib/BookBox';
import Config from '../../config';
import MapboxGl from 'mapbox-gl'
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

import { EventBus, EventNames } from '../plugins/events'
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
      accessToken: Config.mapbox.accesstoken,
      options: {
        container: 'map',
        style: 'mapbox://styles/timmepfeife/cjv8fr1tq0lck1hp94kgp4fhb',
        center: [50, 50],
        zoom: 1.0
      },
      showEdit: false,
      popups: [],
      editPopup: null,
      focusedBookbox: 0
    }
  },
  computed: {
    ...mapGetters('BookStorage', ['userFavorites']),
    ...mapState('BookStorage', ['targets']),
    ...mapState('User', ['isLoggedIn', 'userId', 'token']),
    texts () {
      return {
        [Messages.CREATE_NEW_BOOKBOX]: this.$t(Messages.CREATE_NEW_BOOKBOX),
        [Messages.DESCRIPTION]: this.$t(Messages.DESCRIPTION),
        [Messages.LOCATION]: this.$t(Messages.LOCATION),
        [Messages.HINT]: this.$t(Messages.HINT),
        [Messages.LOGIN]: this.$t(Messages.LOGIN),
        [Messages.SAVE]: this.$t(Messages.SAVE),
        [Messages.ADD_FAVORITE]: this.$t(Messages.ADD_FAVORITE),
        [Messages.REMOVE_FAVORITE]: this.$t(Messages.REMOVE_FAVORITE),
        [Messages.LOGIN_HINT]: this.$t(Messages.LOGIN_HINT)
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
    if (!this.map) {
      await this.getUserLocation();
      this.createMap();
    }

    this.parseBookboxId();

    await this.getBookBoxInfos();
    this.initMap();
    this.initEvents();
  },
  beforeDestroy () {
    // Events get fired twice otherwise
    this.disableEvents();
  },
  methods: {
    initMap () {
      this.targets.forEach((target) => {
        const focused = target.id === this.focusedBookbox;
        this.addPopUp(this.map, target, focused);
        if (focused) {
          this.focusInfobox(target);
        }
      });
      this.createGeoCoder();
    },
    initEvents () {
      EventBus.$on(EventNames.FOCUS_INFOBOX, (data) => {
        this.focusInfobox(data);
      });

      EventBus.$on(EventNames.LOGIN_ROUTE, () => {
        this.$router.push({ path: '/profile' });
      });

      EventBus.$on(EventNames.SAVE_NEW_BOOKBOX, async (bookbox) => {
        await this.saveNewBookbox(bookbox);
      });

      EventBus.$on(EventNames.CHANGE_LOCALE, () => {
        this.resetMap();
      });

      EventBus.$on(EventNames.ADD_FAVORITE, async (bookboxId) => {
        await this.addFavorite(bookboxId);
      });

      EventBus.$on(EventNames.DELETE_FAVORITE, async (bookboxId) => {
        await this.deleteFavorite(bookboxId);
      });
    },
    disableEvents () {
      EventBus.$off(EventNames.SAVE_NEW_BOOKBOX);
      EventBus.$off(EventNames.ADD_FAVORITE);
      EventBus.$off(EventNames.DELETE_FAVORITE);
    },
    addPopUp (map, target, focused) {
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
      box.$props.isLoggedIn = this.isLoggedIn;
      box.$props.isFavorite = this.isFavorite(target.id);
      box.$props.focused = focused;
      box.$mount('#infobox-wrapper');
    },
    onRightClick (event) {
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

      this.map.on('contextmenu', this.onRightClick);
    },
    createGeoCoder () {
      this.geocoder = new MapboxGeocoder({
        accessToken: this.accessToken,
        mapboxgl: MapboxGl,
        language: this.$i18n.locale,
        localGeocoder: this.bookboxGeoCoderSearch,
        localGeocoderOnly: !this.isLoggedIn
      });

      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map))
    },
    bookboxGeoCoderSearch (query) {
      query = query.toLowerCase();

      const found = this.targets.filter(el =>
        el.description.toLowerCase().includes(query) ||
        el.location.toLowerCase().includes(query) ||
        el.hint.toLowerCase().includes(query) ||
        el.id.toString().includes(query)
      );

      const geocodes = [];

      found.forEach((el) => {
        geocodes.push({
          center: [el.lng, el.lat],
          place_name: `Box #${el.id}: ${el.description}`,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        });
      });

      return geocodes;
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
    resetMap () {
      this.popups.forEach((el) => {
        el.remove();
      });

      this.popups = [];

      this.targets.forEach((target) => {
        this.addPopUp(this.map, target)
      });
    },
    isFavorite (bookboxId) {
      const box = this.userFavorites.find(el => el.id === bookboxId);
      return !!box;
    },
    async getBookBoxInfos () {
      await this.$store.dispatch('BookStorage/getBookBoxInfos');
      if (this.isLoggedIn) {
        const user = {
          userId: this.userId,
          token: this.token
        };
        await this.$store.dispatch('BookStorage/getBookBoxFavoritesByUser', user);
      }
    },
    parseBookboxId () {
      const bookboxId = this.$route.query.bookbox;

      if (!bookboxId) return;

      this.focusedBookbox = parseInt(bookboxId);
    },
    async saveNewBookbox (bookbox) {
      const newBox = await BookBox.postBookBoxInfos(this.userId, this.token, bookbox);
      await this.$store.commit('BookStorage/addTarget', newBox);
      if (this.editPopup) {
        this.editPopup.remove();
        this.editPopup = null;
      }
    },
    async addFavorite (bookboxId) {
      const favorite = {
        userId: this.userId,
        token: this.token,
        bookboxId
      };
      await this.$store.dispatch('BookStorage/addFavorite', favorite);
    },
    async deleteFavorite (bookboxId) {
      const favorite = {
        userId: this.userId,
        token: this.token,
        bookboxId
      };
      await this.$store.dispatch('BookStorage/deleteFavorite', favorite);
    },
    async getUserLocation () {
      try {
        const result = await Axios.get('http://ip-api.com/json');

        if (result.data.status !== 'success') return;

        this.options.center = [result.data.lon, result.data.lat];
        this.options.zoom = 5;
      } catch (e) {
        // Do nothing
      }
    }
  }
};
</script>

<style>
@import "../assets/css/components/map.css";
@import "~@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
</style>

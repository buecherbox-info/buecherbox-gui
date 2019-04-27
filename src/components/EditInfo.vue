<template>
  <div class="edit-info-container">
    <h1>Neue Bücherbox anlegen</h1>
    <div
      v-if="isLoggedIn"
      id="form"
    >
      <label>
        Beschreibung
        <input type="text">
      </label>
      <br>
      <label>
        Ort
        <input
          v-model="location"
          type="text"
        >
      </label>
      <br>
      <label>
        Hinweis
        <textarea />
      </label>
    </div>
    <div v-else>
      <p>Du musst dich erst einloggen um eine neue Bücherbox anzulegen.</p>
      <span @click="login">Login</span>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { EventBus, EventNames } from '../events';

export default {
  name: 'EditInfo',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    lngLat: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      location: ''
    }
  },
  async mounted () {
    await this.getLocation();
  },
  methods: {
    async getLocation () {
      const result = await Axios.get(' https://nominatim.openstreetmap.org/reverse', {
        params: {
          format: 'json',
          lat: this.lngLat.lat,
          lon: this.lngLat.lng
        }
      });

      const address = result.data.display_name;

      if (address) {
        this.location = address;
      }
    },
    login () {
      EventBus.$emit(EventNames.LOGIN_ROUTE);
    }
  }
};
</script>

<style scoped>
.coordinates-container {
    width: 50vw;
    margin: 0px auto;
    padding: 20px 30px;
}
</style>

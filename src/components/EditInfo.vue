<template>
  <div class="edit-info-container">
    <h1>{{ $t(Messages.CREATE_NEW_BOOKBOX) }}</h1>
    <div
      v-if="isLoggedIn"
      id="form"
    >
      <label>
        {{ $t(Messages.DESCRIPTION) }}
        <input type="text">
      </label>
      <br>
      <label>
        {{ $t(Messages.LOCATION) }}
        <input
          v-model="location"
          type="text"
        >
      </label>
      <br>
      <label>
        {{ $t(Messages.HINT) }}
        <textarea></textarea>
      </label>
    </div>
    <div v-else>
      <p>Du musst dich erst einloggen um eine neue Bücherbox anzulegen.</p>
      <span @click="login">{{ $t(Messages.LOGIN) }}</span>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { EventBus, EventNames } from '../events';
import Messages from '../assets/lang/messages';

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
    },
    $t: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      location: '',
      Messages
    }
  },
  async mounted () {
    await this.getLocation();
  },
  methods: {
    async getLocation () {
      const result = await Axios.get(' https://nominatim.openstreetmap.org/reverse', {
        baseURL: '',
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

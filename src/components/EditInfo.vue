<template>
  <div class="edit-info-container">
    <h1>{{ texts[Messages.CREATE_NEW_BOOKBOX] }}</h1>
    <div
      v-if="isLoggedIn"
      id="form"
    >
      <label>
        {{ texts[Messages.DESCRIPTION] }}
        <input
          v-model="details.description"
          type="text"
        >
      </label>
      <br>
      <label>
        {{ texts[Messages.LOCATION] }}
        <input
          v-model="details.location"
          type="text"
        >
      </label>
      <br>
      <label>
        {{ texts[Messages.HINT] }}
        <textarea v-model="details.hint"></textarea>
      </label>
      <label>
        Datei:
        <input type="file" @change="setFile" />
      </label>

      <br>

      <button @click="save">
        {{ texts[Messages.SAVE] }}
      </button>
    </div>
    <div v-else>
      <p>Du musst dich erst einloggen um eine neue Bücherbox anzulegen.</p>
      <span @click="login">{{ texts[Messages.LOGIN] }}</span>
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
    texts: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Messages,
      details: {
        description: '',
        hint: '',
        location: '',
        imgsrc: null
      }
    }
  },
  beforeCreate () {
    if (!this.$t) {
      this.$t = this.t;
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
        this.details.location = address;
      }
    },
    login () {
      EventBus.$emit(EventNames.LOGIN_ROUTE);
    },
    save () {
      const bookbox = {
        description: this.details.description,
        lat: this.lngLat.lat,
        lng: this.lngLat.lng,
        imgsrc: this.details.imgsrc,
        hint: this.details.hint,
        location: this.details.location
      };

      EventBus.$emit(EventNames.SAVE_NEW_BOOKBOX, bookbox);
    },
    setFile (event) {
      const files = event.target.files || event.dataTransfer.files;
      if (files.length) {
        this.details.imgsrc = files[0];
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/components/editinfo.css";
</style>

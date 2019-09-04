<template>
  <div class="edit-info-container box">
    <h1 class="title">
      {{ texts[Messages.CREATE_NEW_BOOKBOX] }}
    </h1>
    <div
      v-if="isLoggedIn"
      id="form"
    >
      <div class="field">
        <label class="label">
          {{ texts[Messages.DESCRIPTION] }}
        </label>
        <div class="control">
          <input
            v-model="details.description"
            type="text"
            class="input"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">
          {{ texts[Messages.LOCATION] }}
        </label>
        <div class="control">
          <input
            v-model="details.location"
            type="text"
            class="input"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">
          {{ texts[Messages.HINT] }}
        </label>
        <div class="control">
          <textarea
            v-model="details.hint"
            class="textarea"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">
          Datei:
        </label>
        <div class="control">
          <input
            type="file"
            class="file"
            @change="setFile"
          >
        </div>
      </div>

      <div class="field">
        <a
          class="button"
          @click="save"
        >
          {{ texts[Messages.SAVE] }}
        </a>
      </div>
    </div>
    <div v-else>
      <p>{{ texts[Messages.LOGIN_HINT] }}</p>
      <a @click="login">{{ texts[Messages.LOGIN] }}</a>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { EventBus, EventNames } from '../plugins/events';
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
        img: this.details.imgsrc,
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

<style scoped src="../assets/css/components/editinfo.css">
</style>

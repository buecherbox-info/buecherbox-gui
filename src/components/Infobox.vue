<template>
  <div
    @click="focusInfobox"
  >
    <!-- Preview -->
    <div
      v-if="!focused"
      class="book-box-info-preview"
    >
      {{ shortName }}
      <img
        src="../assets/img/book-open.svg"
        alt="book-open-icon"
      >
    </div>

    <!-- Infos -->
    <div
      v-else
      class="book-box-info"
    >
      <h1>{{ name }}</h1>
      <h2>{{ target.location }}</h2>
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="altImgTag"
      >
      <p>{{ texts[Messages.HINT] }}:</p>
      <p>{{ target.hint }}</p>
    </div>
  </div>
</template>

<script>
import { EventBus, EventNames } from '../events';
import Messages from '../assets/lang/messages';

export default {
  name: 'Infobox',
  props: {
    map: {
      type: Object,
      default: null
    },
    target: {
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
      focused: false
    };
  },
  computed: {
    altImgTag () {
      return `${this.target.name} - ${this.target.location}`;
    },
    coordinates () {
      return {
        lng: this.target.lng,
        lat: this.target.lat
      };
    },
    cssClass () {
      return {
        'book-box-info': this.focused,
        'book-box-info-preview': !this.focused
      };
    },
    name () {
      return this.target.description ? this.target.description : `Box #${this.target.id}`;
    },
    shortName () {
      return `Box #${this.target.id}`;
    },
    imgSrc () {
      const imgId = this.target.imgid;
      const thumnail = this.focused ? '' : '/thumbnail';
      return imgId ? `http://localhost:3000/images/${imgId}${thumnail}` : '';
    }
  },
  created () {
    EventBus.$on(EventNames.FOCUS_INFOBOX, (coords) => {
      if (this.coordinates !== coords) {
        this.focused = false;
      }
    });
  },
  methods: {
    focusInfobox () {
      if (this.focused) {
        this.focused = false;
        return;
      }

      this.focused = true;
      EventBus.$emit(EventNames.FOCUS_INFOBOX, this.coordinates);
    }
  }
};
</script>

<style scoped src="../assets/css/components/infobox.css">
</style>

<template>
  <div
    @click="focusInfobox"
  >
    <!-- Preview -->
    <div
      v-if="!focused"
      class="book-box-info-preview"
    >
      <label class="label is-small is-center">
        {{ shortName }}
      </label>
      <img
        src="../assets/img/book-open.svg"
        alt="book-open-icon"
      >
    </div>

    <!-- Infos -->
    <div
      v-else
      class="book-box-info box"
    >
      <p class="title">
        {{ name }}
        <span v-if="isLoggedIn">
          <img
            v-if="isFavorite"
            src="../assets/img/star_fill.svg"
            style="cursor: pointer;"
            :title="texts[Messages.REMOVE_FAVORITE]"
            @click="removeFavorite"
          >
          <img
            v-else
            src="../assets/img/star.svg"
            style="cursor: pointer;"
            :title="texts[Messages.ADD_FAVORITE]"
            @click="addFavorite"
          >
        </span>
      </p>

      <p class="subtitle is-6">
        {{ target.location }}
      </p>

      <figure class="image">
        <img
          v-if="imgSrc"
          :src="imgSrc"
          :alt="altImgTag"
        >
      </figure>

      <label class="label">
        {{ texts[Messages.HINT] }}:
      </label>
      <ul>
        <li
          v-for="(hint, idx) in hints"
          :key="idx"
        >
          {{ hint }}
        </li>
      </ul>
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
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Messages
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
    },
    hints () {
      let hint = this.target.hint;
      return hint ? hint.split('\n') : [];
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
    },
    addFavorite () {
      this.isFavorite = true;
      EventBus.$emit(EventNames.ADD_FAVORITE, this.target.id);
    },
    removeFavorite () {
      this.isFavorite = false;
      EventBus.$emit(EventNames.DELETE_FAVORITE, this.target.id);
    }
  }
};
</script>

<style scoped src="../assets/css/components/infobox.css">
</style>

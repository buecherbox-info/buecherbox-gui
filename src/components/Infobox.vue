<template>
  <div
    :class="cssClass"
    @click="focusInfobox"
  >
    <!-- Preview -->
    <h1>{{ name }}</h1>
    <img
      v-if="target.imgSrc"
      :src="target.imgSrc"
      :alt="altImgTag"
    >

    <!-- Infos -->
    <div
      v-if="focused"
      class="book-box-description"
    >
      <h2>{{ target.location }}</h2>
      <p>{{ target.hint }}</p>
    </div>
  </div>
</template>

<script>
import { EventBus, EventNames } from '../events';

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
    }
  },
  data () {
    return {
      focused: false
    }
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
      return this.focused ? 'book-box-info' : 'book-box-info-preview';
    },
    name () {
      return this.target.description ? this.target.description : `Box #${this.target.id}`;
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
      this.focused = true;
      EventBus.$emit(EventNames.FOCUS_INFOBOX, this.coordinates);
    }
  }
};
</script>

<style scoped>
.book-box-info {
    width: 200px;
    height: 400px;
}

.book-box-info-preview {
  width: 150px;
  height: 150px;
}

img {
    width: 200px;
    height: 200px;
}
</style>

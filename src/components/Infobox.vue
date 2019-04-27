<template>
  <div
    class="book-box-info"
    @click="focusInfobox"
  >
    <h1>{{ target.description }}</h1>
    <h2>{{ target.location }}</h2>
    <img
      v-if="target.imgSrc"
      :src="target.imgSrc"
      :alt="altImgTag"
    >
    <p>{{ target.hint }}</p>
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
  computed: {
    altImgTag () {
      return `${this.target.name} - ${this.target.location}`;
    },
    coordinates () {
      return {
        lng: this.target.lng,
        lat: this.target.lat
      };
    }
  },
  mounted () {
    // this.getLocation();
  },
  methods: {
    focusInfobox () {
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

img {
    width: 200px;
    height: 200px;
}
</style>

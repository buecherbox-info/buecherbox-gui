<template>
    <div class="book-box-info">
        <h1>{{target.name}}</h1>
        <h2>{{target.location}}</h2>
        <img v-if="target.imgSrc" :src="target.imgSrc" :alt="altImgTag">
        <p>{{target.hint}}</p>
    </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    name: "Infobox",
    props: {
      map: Object,
      target: Object
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      async getLocation() {
        const result = await Axios.get(" https://nominatim.openstreetmap.org/reverse", {
          params: {
            format: 'json',
            lat: this.target.coord.lat,
            lon: this.target.coord.lng
          }
        });
        this.target.location = result.data.display_name;
      }
    },
    computed: {
      altImgTag() {
        return `${this.target.name} - ${this.target.location}`;
      }
    }
  }
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

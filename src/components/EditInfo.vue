<template>
    <div class="edit-info-container">
        <h1>Neue Bücherbox anlegen</h1>

        <label>
            Beschreibung
            <input type="text">
        </label>
        <br>
        <label>
            Ort
            <input type="text" v-model="location">
        </label>
        <br>
        <label>
            Hinweis
            <textarea></textarea>
        </label>
    </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    name: "EditInfo",
    props: {
      lngLat: Object
    },
    data() {
      return {
        location: ''
      }
    },
    async mounted() {
      await this.getLocation();
    },
    methods: {
      async getLocation() {
        const result = await Axios.get(" https://nominatim.openstreetmap.org/reverse", {
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
      }
    }
  }
</script>

<style scoped>
    .coordinates-container {
        width: 50vw;
        margin: 0px auto;
        padding: 20px 30px;
    }
</style>

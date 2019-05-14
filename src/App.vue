<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <div :class="cssClass">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Sidebar
  },
  computed: {
    ...mapState('User', ['userId', 'isLoggedIn', 'token', 'locale']),
    cssClass () {
      return {
        // disable container class for map, otherwise the map is not fullscreen
        'container': this.$route.path !== '/'
      }
    }
  },
  async created () {
    this.$i18n.locale = this.locale;
    await this.getBookbBoxInfos();
  },
  methods: {
    async getBookbBoxInfos () {
      await this.$store.dispatch('BookStorage/getBookBoxInfos');
      if (this.isLoggedIn) {
        await this.getBookBoxFavoritesByUser();
      }
    },
    async getBookBoxFavoritesByUser () {
      const user = {
        userId: this.userId,
        token: this.token
      };
      await this.$store.dispatch('BookStorage/getBookBoxFavoritesByUser', user);
    }
  }
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
@import "assets/css/app.css";
</style>

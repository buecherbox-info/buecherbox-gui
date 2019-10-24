<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <div :class="cssClass">
      <router-view />
    </div>
  </div>
</template>

<script>
import { localize } from 'vee-validate';
import { mapState } from 'vuex';

import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  metaInfo () {
    return {
      titleTemplate: '%s | Buecherbox',
      meta: [
        { name: 'description', content: 'ToDo' },
        { name: 'author', content: 'ToDo' },
        { name: 'keywords', content: 'ToDo, ToDo, Todo' },

        // OpenGraph data (Most widely used)
        { property: 'og:title', content: 'ToDo' },
        { property: 'og:site_name', content: 'ToDo' },
        // The list of types is available here: http://ogp.me/#types
        { property: 'og:type', content: 'website' },
        // Should the the same as your canonical link, see below.
        { property: 'og:url', content: 'ToDo' },
        { property: 'og:image', content: 'ToDo' },
        // Often the same as your meta description, but not always.
        { property: 'og:description', content: 'ToDo' },

        // Twitter card
        { name: 'twitter:card', content: 'ToDo' },
        { name: 'twitter:site', content: 'ToDo' },
        { name: 'twitter:title', content: 'ToDo' },
        { name: 'twitter:description', content: 'ToDo' },
        // Your twitter handle, if you have one.
        { name: 'twitter:creator', content: 'ToDo' },
        { name: 'twitter:image:src', content: 'ToDo' },

        // Google / Schema.org markup:
        { itemprop: 'name', content: 'ToDo' },
        { itemprop: 'description', content: 'ToDo' },
        { itemprop: 'image', content: 'ToDo' }
      ]
    }
  },
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
    localize(this.locale);
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

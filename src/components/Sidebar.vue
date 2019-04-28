<template>
  <div :class="wrapperCss">
    <div class="sidebar-header">
      <div
        class="menu-icon"
        @click="toggleSidebar"
      >
        <img
          src="../assets/img/menu.svg"
          alt="menu-icon"
        >
      </div>
    </div>

    <div class="sidebar-content">
      <router-link
        to="/"
        class="sidebar-element"
      >
        <img
          src="../assets/img/home.svg"
          alt="home-icon"
        >
        <span v-if="!collapsed">{{ $t(Messages.OVERVIEW) }}</span>
      </router-link>

      <router-link
        to="/favorites"
        class="sidebar-element"
      >
        <img
          src="../assets/img/star.svg"
          alt="home-icon"
        >
        <span v-if="!collapsed">{{ $t(Messages.FAVORITES) }}</span>
      </router-link>

      <router-link
        to="/profile"
        class="sidebar-element"
      >
        <img
          src="../assets/img/user.svg"
          alt="profile-icon"
        >
        <span v-if="!collapsed">{{ $t(Messages.PROFILE) }}</span>
      </router-link>

      <router-link
        to="/about"
        class="sidebar-element"
      >
        <img
          src="../assets/img/info.svg"
          alt="about-icon"
        >
        <span v-if="!collapsed">{{ $t(Messages.ABOUT) }}</span>
      </router-link>

      <select v-model="$i18n.locale">
        <option
          v-for="(lang, i) in languages"
          :key="`Lang${i}`"
          :value="lang"
        >
          {{ lang }}
        </option>
      </select>
    </div>

    <div class="sidebar-footer"></div>
  </div>
</template>

<script>
import { EventNames } from '../events';
import Messages from '../assets/lang/messages';

export default {
  name: 'Sidebar',
  data () {
    return {
      Messages,
      collapsed: false,
      languages: [
        'de',
        'en'
      ]
    }
  },
  computed: {
    wrapperCss () {
      return {
        'sidebar-wrapper': true,
        'collapsed': this.collapsed
      }
    }
  },
  methods: {
    toggleSidebar () {
      this.collapsed = !this.collapsed;
      this.$emit(EventNames.TOGGLE_SIDEBAR);
    }
  }
}
</script>

<style scoped>
  .sidebar-wrapper {
    width: 200px;
    padding-right: 1em;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .collapsed {
    width: 50px !important;
  }

  .sidebar-header {
    margin-bottom: 50px;
  }

  .sidebar-content {

  }

  .sidebar-footer {
    position: fixed;
    bottom: 0;
    margin-top: 50px;
  }

  .sidebar-element {
    display: flex;
    align-items: center;
    height: 25px;
    margin: 5px 0;
    padding: 5px;
    border-bottom: 1px solid grey;
  }

  span {
    margin-left: 1em;
  }

  .menu-icon {
    display: inline-block;
    float: right;
    margin-right: 1em;
  }
</style>

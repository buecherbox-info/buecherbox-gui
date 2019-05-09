<template>
  <div :class="wrapperCss">
    <div class="sidebar-header">
      <transition name="fade">
        <img
          v-if="collapsed"
          src="../assets/img/menu.svg"
          alt="menu-icon"
          class="menu-icon"
          @click="toggleSidebar"
        >
        <img
          v-else
          src="../assets/img/x.svg"
          alt="menu-icon"
          class="menu-icon"
          @click="toggleSidebar"
        >
      </transition>
    </div>

    <transition name="fade">
      <div class="sidebar-content">
        <router-link
          to="/"
          class="sidebar-element first"
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

        <label>
          <input
            v-if="!collapsed"
            v-model="$i18n.locale"
            list="languages"
            class="sidebar-lang"
            @focus="$i18n.locale = ''"
          >
        </label>
        <datalist id="languages">
          <option
            v-for="(lang, idx) in languages"
            :key="`${idx}_${lang[1]}`"
            :value="lang[0]"
          >
            {{ lang[1] }}
          </option>
        </datalist>
      </div>
    </transition>

    <div class="sidebar-footer" />
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
        ['de', 'Deutsch'],
        ['en', 'Englisch']
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
@import "../assets/css/components/sidebar.css";
</style>

<template>
  <aside :class="wrapperCss">
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
        <ul class="menu-list">
          <!-- Links -->
          <li>
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
          </li>
          <li>
            <router-link
              to="/favorites"
              class="sidebar-element"
            >
              <img
                src="../assets/img/star.svg"
                alt="home-icon"
                style="vertical-align: middle"
              >
              <span v-if="!collapsed">{{ $t(Messages.FAVORITES) }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/profile"
            >
              <img
                src="../assets/img/user.svg"
                alt="profile-icon"
              >
              <span v-if="!collapsed">{{ $t(Messages.PROFILE) }}</span>
            </router-link>
          </li>
          <li>
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
          </li>
        </ul>

        <!-- Language -->
        <div class="select is-rounded is-centered">
          <select
            v-if="!collapsed"
            @change="changeLocale"
          >
            <option
              v-for="(lang, idx) in languages"
              :key="idx + lang.code"
              :value="lang.code"
            >
              {{ lang.language }}
            </option>
          </select>
        </div>
      </div>
    </transition>

    <div class="sidebar-footer" />
  </aside>
</template>

<script>
import { EventBus, EventNames } from '../events'
import Messages from '../assets/lang/messages';

export default {
  name: 'Sidebar',
  data () {
    return {
      Messages,
      collapsed: false,
      languages: [
        { code: 'de', language: 'Deutsch' },
        { code: 'en', language: 'Englisch' }
      ]
    }
  },
  computed: {
    wrapperCss () {
      return {
        'menu': true,
        'sidebar-wrapper': true,
        'collapsed': this.collapsed
      }
    }
  },
  methods: {
    toggleSidebar () {
      this.collapsed = !this.collapsed;
      this.$emit(EventNames.TOGGLE_SIDEBAR);
    },
    changeLocale (event) {
      this.$i18n.locale = event.target.value;
      EventBus.$emit(EventNames.CHANGE_LOCALE);
    }
  }
}
</script>

<style scoped src="../assets/css/components/sidebar.css">
</style>

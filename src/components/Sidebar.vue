<template>
  <aside :class="wrapperCss">
    <div class="sidebar-header">
      <transition name="fade">
        <img
          v-if="collapsed"
          src="../assets/img/menu.svg"
          alt="menu-icon"
          class="menu-icon"
          :title="$t(Messages.SHOW_SIDEBAR)"
          @click="toggleSidebar"
        >
        <img
          v-else
          src="../assets/img/x.svg"
          alt="menu-icon"
          class="menu-icon"
          :title="$t(Messages.HIDE_SIDEBAR)"
          @click="toggleSidebar"
        >
      </transition>
    </div>

    <transition name="fade">
      <div class="sidebar-content">
        <ul class="menu-list">
          <!-- ToDo Icons get resized when changing language -->
          <!-- Links -->
          <li>
            <router-link
              to="/"
              class="sidebar-element"
              :title="collapsed ? $t(Messages.MAP) : ''"
            >
              <img
                src="../assets/img/map.svg"
                alt="home-icon"
              >
              <span v-if="!collapsed">{{ $t(Messages.MAP) }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/favorites"
              class="sidebar-element"
              :title="collapsed ? $t(Messages.FAVORITES) : ''"
            >
              <img
                src="../assets/img/star.svg"
                alt="home-icon"
                style="vertical-align: middle"
              >
              <span v-if="!collapsed">{{ $t(Messages.FAVORITES) }}</span>
            </router-link>
          </li>
          <li v-if="accessDashboard">
            <router-link
              to="/dashboard"
              class="sidebar-element"
              :title="collapsed ? $t(Messages.DASHBOARD) : ''"
            >
              <img
                src="../assets/img/user.svg"
                alt="profile-icon"
              >
              <span v-if="!collapsed">{{ $t(Messages.DASHBOARD) }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/profile"
              class="sidebar-element"
              :title="collapsed ? $t(Messages.PROFILE) : ''"
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
              :title="collapsed ? $t(Messages.ABOUT) : ''"
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
        <div
          v-if="!collapsed"
          class="field"
        >
          <div class="control has-icons-left">
            <div class="select is-rounded is-centered">
              <select
                :title="$t(Messages.CHANGE_LOCALE)"
                @change="changeLocale"
              >
                <option
                  v-for="(lang, idx) in languages"
                  :key="idx + lang.code"
                  :value="lang.code"
                  :selected="$i18n.locale === lang.code"
                >
                  {{ lang.language }}
                </option>
              </select>
            </div>
            <div class="icon is-small is-left">
              <img
                src="../assets/img/globe.svg"
                alt="globe-icon"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="sidebar-footer" />
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

import { EventBus, EventNames } from '../plugins/events';
import Messages from '../assets/lang/messages';

export default {
  name: 'Sidebar',
  data () {
    return {
      Messages,
      collapsed: false,
      languages: [
        { code: 'de', language: 'Deutsch' },
        { code: 'en', language: 'English' },
        { code: 'es', language: 'Español' },
        { code: 'fr', language: 'Français' },
        { code: 'it', language: 'Italiano' },
        { code: 'nl', language: 'Nederlands' },
        { code: 'pl', language: 'Polski' },
        { code: 'pt', language: 'Português' },
        { code: 'ru', language: 'Русский язык' }
      ]
    }
  },
  computed: {
    ...mapGetters('User', ['accessDashboard']),
    wrapperCss () {
      return {
        'box': true,
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
      const locale = event.target.value;
      this.$i18n.locale = locale;
      this.$store.commit('User/setLocale', locale);
      EventBus.$emit(EventNames.CHANGE_LOCALE);
    }
  }
}
</script>

<style scoped src="../assets/css/components/sidebar.css">
</style>

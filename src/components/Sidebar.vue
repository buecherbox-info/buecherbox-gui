<template>
  <div id="sidebar-wrapper">
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in languages"
        :key="`Lang${i}`"
        :value="lang"
      >
        {{ lang }}
      </option>
    </select>

    <div
      class="sidebar-element"
      @click="toggleSidebar"
    >
      <img
        src="../assets/img/menu.svg"
        alt="menu-icon"
      >
      <span v-if="!collapsed">Menü</span>
    </div>

    <router-link
      to="/"
      class="sidebar-element"
    >
      <img
        src="../assets/img/home.svg"
        alt="home-icon"
      >
      <span v-if="!collapsed">Home</span>
    </router-link>

    <router-link
      to="/favorites"
      class="sidebar-element"
    >
      <img
        src="../assets/img/star.svg"
        alt="home-icon"
      >
      <span v-if="!collapsed">Favoriten</span>
    </router-link>

    <router-link
      to="/profile"
      class="sidebar-element"
    >
      <img
        src="../assets/img/user.svg"
        alt="profile-icon"
      >
      <span v-if="!collapsed">Profil</span>
    </router-link>

    <router-link
      to="/about"
      class="sidebar-element"
    >
      <img
        src="../assets/img/info.svg"
        alt="about-icon"
      >
      <span v-if="!collapsed">Über</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      collapsed: false,
      languages: [
        'de',
        'en'
      ]
    }
  },
  methods: {
    toggleSidebar () {
      this.collapsed = !this.collapsed;
      this.$emit('toggle-sidebar');
    }
  }
}
</script>

<style scoped>
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
</style>

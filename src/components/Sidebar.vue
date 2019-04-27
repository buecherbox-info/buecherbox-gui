<template>
    <div id="sidebar-wrapper">
        <div id="sidebar">
            <p @click="toggleSidebar">
                <img src="https://img.icons8.com/ios/50/000000/menu-filled.png">
                Menü
            </p>

            <p>
                <router-link to="/">Home</router-link>
            </p>
            <p>
                <router-link to="/profile">Profil</router-link>
            </p>
            <p>
                <router-link to="/favorites">Favoriten</router-link>
            </p>
            <p>
                <router-link to="/about">Über</router-link>
            </p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        collapsed: false
      }
    },
    methods: {
      toggleSidebar() {
        this.collapsed = !this.collapsed;
        this.$emit('toggle-sidebar');
      }
    }
  }
</script>

<style scoped>
    #sidebar {
        width: 200px;
    }

    #sidebar-collapsed {
        width: 100px;
    }
</style>

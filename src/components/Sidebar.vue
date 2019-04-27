<template>
    <div class="sidebar">
        <p><router-link to="/">Home</router-link></p>
        <p><router-link to="/profile">Profil</router-link></p>
        <p><router-link to="/favorites">Favoriten</router-link></p>
        <p><router-link to="/about">Über</router-link></p>
    </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style scoped>

</style>

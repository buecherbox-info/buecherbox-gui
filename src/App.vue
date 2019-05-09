<template>
  <div class="app">
    <Sidebar
      class="sidebar"
      @toggleSidebar="toggledSidebar = !toggledSidebar"
    />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Sidebar
  }
};
</script>

<style>
@import "assets/css/app.css";
</style>

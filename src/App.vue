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
body {
  margin: 0;
}

.app {
  width: 100%;
  overflow: hidden;
}

.sidebar {
  display: block;
  height: calc(100vh);
  float: left;
  position: relative;
  z-index: 1;
}

.content {
  display: block;
  position: static;
  z-index: 0;
  transition: ease-in-out .2s;
}
</style>

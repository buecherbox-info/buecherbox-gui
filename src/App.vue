<template>
  <div class="app">
    <Sidebar class="sidebar" />
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
}
</style>

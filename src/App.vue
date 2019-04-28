<template>
  <div class="app">
    <Sidebar
      :class="cssSidebar"
      @toggle-sidebar="showSidebar = !showSidebar"
    />
    <div class="content">
      <router-view :show-sidebar="showSidebar" />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data () {
    return {
      showSidebar: true
    }
  },
  computed: {
    cssSidebar () {
      return {
        'sidebar': true,
        'collapsed': !this.showSidebar
      };
    }
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
  width: 200px;
  height: calc(100vh);
  float: left;
  position: relative;
  z-index: 1;
  background-color: rgba(255,255,255,0.8);
}

.collapsed {
  width: 50px !important;
}

.content {
  display: block;
  position: static;
  z-index: 0;
}
</style>

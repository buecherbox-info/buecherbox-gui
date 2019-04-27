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
      return this.showSidebar ? 'sidebar' : 'sidebar-collapsed';
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
    width: 200px;
    float: left;
}

.sidebar-collapsed {
    width: 50px;
    float: left;
}

.content {
    overflow: hidden;
}
</style>

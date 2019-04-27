<template>
    <div class="app">
        <Sidebar :class="cssSidebar" @toggle-sidebar="showSidebar = !showSidebar"></Sidebar>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import Sidebar from './components/Sidebar';

  export default {
    name: 'app',
    components: {
      Sidebar
    },
    data() {
      return {
        showSidebar: true
      }
    },
    computed: {
      cssSidebar() {
        return this.showSidebar ? 'sidebar' : 'sidebar-collapsed';
      }
    }
  }
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

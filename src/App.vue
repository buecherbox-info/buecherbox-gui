<template>
    <div class="app">
        <Sidebar class="sidebar"></Sidebar>
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
    }
  }
</script>

<style>
    .sidebar {
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #fff;
        position: fixed;
        height: 100%;
        overflow: auto;
    }

    .content {
        margin-left: 200px;
    }
</style>

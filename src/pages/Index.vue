<template>
    <Map :show-sidebar="showSidebar"></Map>
</template>

<script>
  import Map from '../components/Map';

  export default {
    name: "Index",
    components: {
      Map
    },
    props: {
      showSidebar: {
        type: Boolean,
        default: true
      }
    },
  }
</script>

<style scoped>

</style>

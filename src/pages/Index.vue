<template>
  <Map :show-sidebar="showSidebar" />
</template>

<script>
import Map from '../components/Map'
import Messages from '../assets/lang/messages'

export default {
  name: 'Index',
  metaInfo () {
    return {
      title: this.$t(Messages.MAP)
    }
  },
  components: {
    Map
  },
  props: {
    showSidebar: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>

</style>

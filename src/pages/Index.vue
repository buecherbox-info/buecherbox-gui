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
  },
  mounted () {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';
  },
  destroyed () {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = 'yes';
  }
};
</script>

<style scoped>

</style>

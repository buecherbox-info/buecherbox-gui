<template>
  <div
    id="about"
    class="content"
  >
    <h1>{{ $t(Messages.ABOUT) }}</h1>
  </div>
</template>

<script>
import Messages from '../assets/lang/messages';

export default {
  name: 'About',
  metaInfo () {
    return {
      title: this.$t(Messages.ABOUT)
    }
  },
  data () {
    return {
      Messages
    };
  }
};
</script>

<style scoped>

</style>

<template>
  <div id="about">
    <h1>{{ Messages.ABOUT }}</h1>
  </div>
</template>

<script>
import Messages from '../assets/lang/messages';

export default {
  name: 'About',
  data () {
    return {
      Messages
    };
  }
};
</script>

<style scoped>

</style>

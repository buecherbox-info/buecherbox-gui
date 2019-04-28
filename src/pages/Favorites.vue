<template>
  <div id="favorites">
    <h1>{{ $t(Messages.FAVORITES) }}</h1>
  </div>
</template>

<script>
import Messages from '../assets/lang/messages';

export default {
  name: 'Favorites',
  data () {
    return {
      Messages,
    };
  }
};
</script>

<style scoped>

</style>

<template>
  <div class="box">
    <p class="title">
      {{ bookbox.description }}
    </p>

    <p class="subtitle">
      {{ bookbox.location }}
    </p>

    <figure class="image is-">
      <img
        :src="imgSrc"
        alt="Image"
      >
    </figure>

    <label class="label">
      {{ $t(Messages.HINT) }}:
    </label>

    <ul>
      <li
        v-for="(hint, idx) in hints"
        :key="'hint_' + idx"
      >
        {{ hint }}
      </li>
    </ul>
  </div>
</template>

<script>
import Messages from '../assets/lang/messages';

export default {
  name: 'BookInfo',
  props: {
    bookbox: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Messages
    }
  },
  computed: {
    hints () {
      return this.bookbox.hint ? this.bookbox.hint.split('\n') : [];
    },
    imgSrc () {
      const imgId = this.bookbox.imgid;
      return imgId ? `http://localhost:3000/images/${imgId}/thumbnail` : '';
    }
  }
}
</script>

<style scoped>

</style>

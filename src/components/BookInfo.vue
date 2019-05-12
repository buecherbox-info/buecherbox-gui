<template>
  <div class="box">
    <p class="title">
      <span
        style="cursor: pointer"
        :title="$t(Messages.SHOW_ON_MAP)"
        @click="showOnMap"
      >
        {{ bookbox.description }}
      </span>
      <img
        v-if="type === 'favorite'"
        src="../assets/img/trash.svg"
        style="cursor: pointer;"
        :title="$t(Messages.REMOVE_FAVORITE)"
        @click="deleteFavorite"
      >
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
import { EventNames } from '../plugins/events';
import Messages from '../assets/lang/messages';

export default {
  name: 'BookInfo',
  props: {
    bookbox: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'info'
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
  },
  methods: {
    deleteFavorite () {
      this.$emit(EventNames.DELETE_FAVORITE, this.bookbox.id);
    },
    showOnMap () {
      this.$router.push({ path: '/', query: { bookbox: this.bookbox.id } });
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div
    id="favorites"
    class="content"
  >
    <h1>{{ $t(Messages.FAVORITES) }}</h1>

    <!-- Created -->
    <book-info
      v-for="(box, idx) in userFavorites"
      :key="'box_' + idx"
      :bookbox="box"
      type="favorite"
      @deleteFavorite="deleteFavorite"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Messages from '../assets/lang/messages';

import BookInfo from '../components/BookInfo';

export default {
  name: 'Favorites',
  metaInfo () {
    return {
      title: this.$t(Messages.FAVORITES)
    }
  },
  components: {
    BookInfo
  },
  data () {
    return {
      Messages
    };
  },
  computed: {
    ...mapGetters('BookStorage', ['userFavorites']),
    ...mapState('User', ['userId', 'isLoggedIn', 'token'])
  },
  watch: {
    async isLoggedIn () {
      if (this.isLoggedIn) {
        await this.getBookBoxFavoritesByUser();
      }
    }
  },
  async mounted () {
    if (this.isLoggedIn) {
      await this.getBookBoxFavoritesByUser();
    } else {
      this.$router.push({ path: 'login' });
    }
  },
  methods: {
    async getBookBoxFavoritesByUser () {
      const user = {
        userId: this.userId,
        token: this.token
      };
      await this.$store.dispatch('BookStorage/getBookBoxFavoritesByUser', user);
    },
    async deleteFavorite (bookboxId) {
      const favorite = {
        userId: this.userId,
        token: this.token,
        bookboxId
      };
      await this.$store.dispatch('BookStorage/deleteFavorite', favorite);
    }
  }
};
</script>

<style scoped>

</style>

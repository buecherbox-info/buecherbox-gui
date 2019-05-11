<template>
  <div id="favorites">
    <h1>{{ $t(Messages.FAVORITES) }}</h1>

    <LoginForm v-if="!isLoggedIn" />

    <div v-else>
      <!-- Created -->
      <book-info
        v-for="(box, idx) in userFavorites"
        :key="'box_' + idx"
        :bookbox="box"
        type="favorite"
        @deleteFavorite="deleteFavorite"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Messages from '../assets/lang/messages';

import BookInfo from '../components/BookInfo';
import LoginForm from '../components/LoginForm';

export default {
  name: 'Favorites',
  components: {
    BookInfo,
    LoginForm
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
      console.log(bookboxId);
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

<template>
  <div id="favorites">
    <h1>{{ $t(Messages.FAVORITES) }}</h1>

    <LoginForm
      v-if="!isLoggedIn"
      @userLoggedIn="getBookBoxInfosByUser"
    />

    <div v-else>
      <!-- Created -->
      <book-info
        v-for="(box, idx) in favorites"
        :key="'box_' + idx"
        :bookbox="box"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState('BookStorage', ['favorites']),
    ...mapState('User', ['userId', 'isLoggedIn', 'token'])
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
    }
  }
};
</script>

<style scoped>

</style>

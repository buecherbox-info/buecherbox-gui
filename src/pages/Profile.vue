<template>
  <div id="profile">
    <h1>
      {{ $t(Messages.PROFILE) }}
      <span
        v-if="isLoggedIn"
        class="logout"
        @click="logoutUser"
      >Logout</span>
    </h1>

    <LoginForm
      v-if="!isLoggedIn"
      @userLoggedIn="getBookBoxInfosByUser"
    />

    <div v-else>
      <h2>Meine Bücherboxen:</h2>
      <div
        v-for="(box, idx) in created"
        :key="idx"
        class="book-box-info"
      >
        <h3>{{ box.description }}</h3>
        <p>Ort: {{ box.location }}</p>
        <p>Hinweis: {{ box.hint }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';

import LoginForm from '../components/LoginForm';

export default {
  name: 'Profile',
  components: {
    LoginForm
  },
  data () {
    return {
      Messages
    }
  },
  computed: {
    ...mapState('BookStorage', ['created']),
    ...mapState('User', ['userId', 'isLoggedIn', 'token'])
  },
  watch: {
    async isLoggedIn () {
      if (this.isLoggedIn) {
        await this.getBookBoxInfosByUser();
      }
    }
  },
  async mounted () {
    if (this.isLoggedIn) {
      await this.getBookBoxInfosByUser();
    }
  },
  methods: {
    async logoutUser () {
      await this.$store.commit('User/logout');
    },
    async getBookBoxInfosByUser () {
      const user = {
        userId: this.userId,
        token: this.token
      };
      await this.$store.dispatch('BookStorage/getBookBoxInfosByUser', user);
    }
  }
};
</script>

<style scoped>
.book-box-info {
    border: 1px solid black;
}

.logout {
    font-weight: normal;
    font-size: 12pt;
}
</style>

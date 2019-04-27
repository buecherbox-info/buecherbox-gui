<template>
  <div id="profile">
    <h1>
      Profil
      <span
        v-if="isLoggedIn"
        class="logout"
        @click="logoutUser"
      >Logout</span>
    </h1>

    <LoginForm
      v-if="!isLoggedIn"
      ref="loginForm"
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
import { EventNames } from '../events';
import { mapState } from 'vuex';

import LoginForm from '../components/LoginForm';

export default {
  name: 'Profile',
  components: {
    LoginForm
  },
  computed: {
    ...mapState('BookStorage', ['created']),
    ...mapState('User', ['isLoggedIn', 'token'])
  },
  created () {
    this.$refs.loginForm.$on(EventNames.USER_LOGGED_IN, this.getBookBoxInfosByUser());
  },
  async updated () {
    if (this.isLoggedIn) {
      await this.getBookBoxInfosByUser();
    }
  },
  methods: {
    async logoutUser () {
      await this.$store.commit('User/logout');
    },
    async getBookBoxInfosByUser () {
      await this.$store.dispatch('BookStorage/getBookBoxInfosByUser', this.token);
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

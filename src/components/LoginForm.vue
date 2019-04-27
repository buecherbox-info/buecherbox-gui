<template>
  <!-- Login -->
  <div
    v-if="!isLoggedIn"
    id="login-form"
  >
    <h1>Login</h1>

    <label>
      Benutzername:
      <input v-model="username">
    </label>

    <br>

    <label>
      Passwort:
      <input
        v-model="password"
        type="password"
      >
    </label>

    <br>

    <button @click="loginUser">
      Login
    </button>
  </div>

  <!-- Logout-->
  <div v-else>
    <p>Sie sind bereits eingeloggt.</p>
    <button @click="logoutUser">
      Logout
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LoginForm',
  computed: {
    ...mapState('User', ['isLoggedIn']),
    username: {
      get () {
        return this.$store.state.User.username;
      },
      set (value) {
        this.$store.commit('User/setUsername', value);
      }
    },
    password: {
      get () {
        return this.$store.state.User.password;
      },
      set (value) {
        this.$store.commit('User/setPassword', value);
      }
    }
  },
  methods: {
    async loginUser () {
      await this.$store.dispatch('User/login');
    },
    async logoutUser () {
      await this.$store.commit('User/logout');
    }
  }
};
</script>

<style scoped>

</style>

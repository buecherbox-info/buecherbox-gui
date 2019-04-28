<template>
  <!-- Login -->
  <div
    v-if="!isLoggedIn"
    id="login-form"
  >
    <h3>{{ $t(Messages.LOGIN) }}</h3>

    <label>
      {{ $t(Messages.USERNAME) }}:
      <input v-model="username">
    </label>

    <br>

    <label>
      {{ $t(Messages.PASSWORD) }}:
      <input
        v-model="password"
        type="password"
      >
    </label>

    <br>

    <label v-if="register">
      {{ $t(Messages.CONFIRM_PASSWORD) }}:
      <input
              v-model="passwordConfirmation"
              type="password"
      >
    </label>

    <br>

    <button @click="loginUser">
      {{ $t(Messages.LOGIN) }}
    </button>
    <button @click="registerUser">
      {{ registerLabel }}
    </button>
  </div>

  <!-- Logout-->
  <div v-else>
    <p>Sie sind bereits eingeloggt.</p>
    <button @click="logoutUser">
      {{ $t(Messages.LOGOUT) }}:
    </button>
  </div>
</template>

<script>
import { EventNames } from '../events';
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';

export default {
  name: 'LoginForm',
  data () {
    return {
      Messages,
      register: false,
      passwordConfirmation: ''
    }
  },
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
    },
    registerLabel () {
      return this.register ? this.$t(Messages.SENT) : this.$t(Messages.REGISTER);
    }
  },
  methods: {
    async loginUser () {
      await this.$store.dispatch('User/login');
      this.$emit(EventNames.USER_LOGGED_IN);
    },
    async logoutUser () {
      await this.$store.commit('User/logout');
      this.$emit(EventNames.USER_LOGGED_OUT);
    },
    async registerUser () {
      if (this.register) {

      } else {

      }
      this.register = !this.register;
    }
  }
};
</script>

<style scoped>

</style>

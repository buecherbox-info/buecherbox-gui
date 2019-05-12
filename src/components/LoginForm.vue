<template>
  <!-- Login -->
  <div
    id="login-form"
    class="box"
  >
    <h3>{{ $t(Messages.LOGIN) }}</h3>

    <!-- Notification -->
    <div
      v-if="showNotification"
      class="notification is-danger"
    >
      <button
        class="delete"
        @click="showNotification = false"
      />
      {{ errorMessage }}
    </div>

    <!-- Login -->
    <div class="field">
      <label class="label">
        {{ $t(Messages.USERNAME) }}:
      </label>
      <div class="control">
        <input
          v-model="username"
          class="input"
          :placeholder="$t(Messages.USERNAME)"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">
        {{ $t(Messages.PASSWORD) }}:
      </label>
      <div class="control">
        <input
          v-model="password"
          type="password"
          class="input"
          :placeholder="$t(Messages.PASSWORD)"
        >
      </div>
    </div>

    <!-- Register -->
    <div
      v-if="register"
      class="field"
    >
      <div class="control">
        <input
          v-model="passwordConfirmation"
          type="password"
          class="input"
          :placeholder="$t(Messages.CONFIRM_PASSWORD)"
        >
      </div>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <a
          v-if="!register"
          class="button"
          @click="loginUser"
        >
          {{ $t(Messages.LOGIN) }}
        </a>
      </p>

      <p class="control">
        <a
          class="button"
          @click="registerUser"
        >
          {{ registerLabel }}
        </a>
      </p>

      <p
        v-if="register"
        class="control"
      >
        <a
          class="button"
          @click="register = false"
        >
          {{ $t(Messages.CANCEL) }}
        </a>
      </p>
    </div>
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
      showNotification: false,
      errorMessages: []
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
      },
    },
    password: {
      get () {
        return this.$store.state.User.password;
      },
      set (value) {
        this.$store.commit('User/setPassword', value);
      }
    },
    passwordConfirmation: {
      get () {
        return this.$store.state.User.passwordConfirmation;
      },
      set (value) {
        this.$store.commit('User/setPasswordConfirmation', value);
      }
    },
    registerLabel () {
      return this.register ? this.$t(Messages.SENT) : this.$t(Messages.REGISTER);
    },
    errorMessage () {
      let errorMsg = '';

      this.errorMessages.forEach((msg) => {
        errorMsg += this.$t(msg);
        errorMsg += ' ';
      });

      console.log(errorMsg);

      return errorMsg;
    }
  },
  methods: {
    async loginUser () {
      try {
        await this.$store.dispatch('User/login');
        this.$emit(EventNames.USER_LOGGED_IN);
      } catch (e) {
        this.showNotification = true;
        if (e.response.status === 401) {
          this.errorMessages.push(Messages.LOGIN_FAILED);
          this.errorMessages.push(Messages.WRONG_AUTH);
        }
      }
    },
    async logoutUser () {
      await this.$store.commit('User/logout');
      this.$emit(EventNames.USER_LOGGED_OUT);
    },
    async registerUser () {
      if (this.register) {
        if (this.password !== this.passwordConfirmation) return;
        await this.$store.dispatch('User/register');
      } else {
        this.register = !this.register;
      }
    }
  }
};
</script>

<style scoped src="../assets/css/components/loginform.css">
</style>

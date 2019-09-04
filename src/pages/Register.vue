<!-- ToDo: Register as Page instead here -->
<template>
  <!-- Login -->
  <div
    id="login"
    class="content"
  >
    <h3>{{ $t(Messages.REGISTER) }}</h3>

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

    <div class="field">
      <div class="field">
        <label class="label">
          {{ $t(Messages.USERNAME) }}:
        </label>
        <div class="control">
          <input
            v-model="username"
            v-validate="'required'"
            :data-vv-as="$t(Messages.USERNAME)"
            :name="Messages.USERNAME"
            class="input"
            :placeholder="$t(Messages.USERNAME)"
          >
        </div>
        <p class="help is-danger">
          {{ errors.first(Messages.USERNAME) }}
        </p>
      </div>

      <div class="field">
        <label class="label">
          {{ $t(Messages.PASSWORD) }}:
        </label>
        <div class="control">
          <input
            :ref="Messages.PASSWORD"
            v-model="password"
            v-validate="'required'"
            :data-vv-as="$t(Messages.PASSWORD)"
            :name="Messages.PASSWORD"
            type="password"
            class="input"
            :placeholder="$t(Messages.PASSWORD)"
          >
        </div>
        <p class="help is-danger">
          {{ errors.first(Messages.PASSWORD) }}
        </p>
      </div>
    </div>

    <!-- Register -->
    <div class="field">
      <div class="control">
        <input
          v-model="passwordConfirmation"
          v-validate="validateConfirmPassword"
          type="password"
          :data-vv-as="$t(Messages.CONFIRM_PASSWORD)"
          :name="Messages.CONFIRM_PASSWORD"
          class="input"
          :placeholder="$t(Messages.CONFIRM_PASSWORD)"
        >
      </div>
      <p class="help is-danger">
        {{ errors.first(Messages.CONFIRM_PASSWORD) }}
      </p>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <a
          class="button"
          :disabled="errors.any()"
          @click="registerUser"
        >
          {{ $t(Messages.SENT) }}
        </a>
      </p>

      <p class="control">
        <a
          class="button"
          @click="$router.push({ path: 'login' })"
        >
          {{ $t(Messages.CANCEL) }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';

export default {
  name: 'LoginForm',
  data () {
    return {
      Messages,
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
    passwordConfirmation: {
      get () {
        return this.$store.state.User.passwordConfirmation;
      },
      set (value) {
        this.$store.commit('User/setPasswordConfirmation', value);
      }
    },
    errorMessage () {
      let errorMsg = '';

      this.errorMessages.forEach((msg) => {
        errorMsg += this.$t(msg);
        errorMsg += ' ';
      });

      return errorMsg;
    },
    validateConfirmPassword () {
      return `required|confirmed:${Messages.PASSWORD}`;
    },
    validForm () {
      return !this.errors.any();
    }
  },
  methods: {
    async registerUser () {
      try {
        if (this.password !== this.passwordConfirmation) return;
        await this.$store.dispatch('User/register');
        this.$router.push({ path: 'profile' });
      } catch (e) {
        this.showNotification = true;

        if (e.response.status === 409) {
          this.errorMessages = [];
          this.errorMessages.push(Messages.REGISTERATION_FAILED);
          this.errorMessages.push(Messages.USERNAME_EXISTS);
        }
      }
    }
  }
};
</script>

<style scoped src="../assets/css/components/loginform.css">
</style>

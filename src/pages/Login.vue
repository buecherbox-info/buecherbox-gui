<!-- ToDo: Register as Page instead here -->
<template>
  <!-- Login -->
  <div
    id="login"
    class="content"
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
      <div class="field">
        <label class="label">
          {{ $t(Messages.USERNAME) }}:
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
        </label>
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

    <div class="field is-grouped">
      <p class="control">
        <!-- ToDo Login on enter press -->
        <a
          class="button"
          :disabled="!validForm"
          @click="loginUser"
        >
          {{ $t(Messages.LOGIN) }}
        </a>
      </p>

      <p class="control">
        <a
          class="button"
          @click="$router.push({ path: 'register' })"
        >
          {{ $t(Messages.REGISTER) }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { EventNames } from '../plugins/events';
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
    async loginUser () {
      if (!this.validForm) return;

      try {
        await this.$store.dispatch('User/login');
        this.$emit(EventNames.USER_LOGGED_IN);
        this.$router.push({ path: 'profile' });
      } catch (e) {
        this.showNotification = true;
        if (e.response.status === 401) {
          this.errorMessages = [];
          this.errorMessages.push(Messages.LOGIN_FAILED);
          this.errorMessages.push(Messages.WRONG_AUTH);
        }
      }
    }
  }
};
</script>

<style scoped src="../assets/css/components/loginform.css">
</style>

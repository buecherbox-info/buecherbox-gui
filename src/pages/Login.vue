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
    <ValidationObserver
      ref="loginObserver"
      v-slot="{ invalid }"
      @submit.prevent="loginUser"
    >
      <div class="field">
        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            :name="$t(Messages.USERNAME)"
          >
            <label class="label">
              {{ $t(Messages.USERNAME) }}:
              <div class="control">
                <input
                  v-model="username"
                  class="input"
                  :placeholder="$t(Messages.USERNAME)"
                >
              </div>
            </label>
            <p class="help is-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            :name="$t(Messages.PASSWORD)"
          >
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
            <p class="help is-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <!-- ToDo Login on enter press -->
            <a
              class="button"
              :disabled="invalid"
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
    </ValidationObserver>
  </div>
</template>

<script>
import { EventNames } from '../plugins/events';
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'LoginForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
    }
  },
  methods: {
    async loginUser () {
      const isValid = await this.$refs.loginObserver.validate();
      if (!isValid) return;

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

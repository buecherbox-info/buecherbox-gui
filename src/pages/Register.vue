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

    <!-- Form -->
    <ValidationObserver
      ref="registerObserver"
      v-slot="{ invalid }"
      @submit.prevent="registerUser"
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
            </label>
            <div class="control">
              <input
                v-model="username"
                class="input"
                :placeholder="$t(Messages.USERNAME)"
              >
            </div>
            <p class="help is-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            :name="$t(Messages.EMAIL)"
          >
            <label class="label">
              {{ $t(Messages.EMAIL) }}:
            </label>
            <div class="control">
              <input
                v-model="mail"
                class="input"
                :placeholder="$t(Messages.EMAIL)"
              >
            </div>
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

        <div class="field">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="`required|password:${$t(Messages.PASSWORD)}`"
            :name="$t(Messages.CONFIRM_PASSWORD)"
          >
            <div class="control">
              <input
                v-model="passwordConfirmation"
                type="password"
                class="input"
                :placeholder="$t(Messages.CONFIRM_PASSWORD)"
              >
            </div>
            <p class="help is-danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <a
              class="button"
              :disabled="invalid"
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
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Messages from '../assets/lang/messages';

export default {
  name: 'Register',
  metaInfo () {
    return {
      title: this.$t(Messages.REGISTER)
    }
  },
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
    mail: {
      get () {
        return this.$store.state.User.email;
      },
      set (value) {
        this.$store.commit('User/setEmail', value);
      }
    },
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
      const isValid = await this.$refs.registerObserver.validate();
      if (!isValid) return;

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

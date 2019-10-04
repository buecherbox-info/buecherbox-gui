<template>
  <div
    id="profile"
    class="content"
  >
    <h1 class="title">
      {{ $t(Messages.PROFILE) }}

      <img
        v-if="isLoggedIn"
        src="../assets/img/edit.svg"
        alt="edit-icon"
        style="cursor: pointer"
        :title="$t(Messages.EDIT_USER)"
        @click="editUser = !editUser"
      >
    </h1>

    <a
      v-if="isLoggedIn"
      class="subtitle button is-small"
      :title="$t(Messages.LOGOUT_USER)"
      @click="logoutUser"
    >
      Logout
    </a>

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

    <!-- Personal Data -->
    <div class="box">
      <ValidationObserver
        ref="changeObserver"
        v-slot="{ invalid }"
        @submit.prevent="changePassword"
      >
        <div class="field">
          <div class="field">
            <label class="label">
              {{ $t(Messages.USERNAME) }}:
            </label>
            <div class="control">
              <input
                v-model="username"
                class="input is-disabled"
                disabled
              >
            </div>
          </div>

          <div class="field">
            <label class="label">
              {{ $t(Messages.EMAIL) }}:
            </label>
            <div class="control">
              <input
                v-model="mail"
                class="input is-disabled"
                disabled
              >
            </div>
          </div>

          <div class="field">
            <div class="field">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                :name="$t(Messages.OLD_PASSWORD)"
              >
                <label class="label">
                  {{ $t(Messages.PASSWORD) }}:
                </label>
                <div class="control">
                  <input
                    v-model="passwordOld"
                    class="input"
                    type="password"
                    :placeholder="!editUser ? '******' : $t(Messages.OLD_PASSWORD)"
                    :disabled="!editUser"
                  >
                </div>
              </ValidationProvider>
            </div>

            <div
              v-if="editUser"
            >
              <div class="field">
                <ValidationProvider
                  rules="required"
                  :name="$t(Messages.NEW_PASSWORD)"
                >
                  <div class="control">
                    <input
                      v-model="password"
                      class="input"
                      type="password"
                      :placeholder="$t(Messages.NEW_PASSWORD)"
                    >
                  </div>
                </ValidationProvider>
              </div>

              <div class="field">
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="`required|password:${$t(Messages.NEW_PASSWORD)}`"
                  :name="$t(Messages.CONFIRM_NEW_PASSWORD)"
                >
                  <div class="control">
                    <input
                      v-model="passwordConfirmation"
                      class="input"
                      type="password"
                      :placeholder="$t(Messages.CONFIRM_NEW_PASSWORD)"
                    >
                    <p class="help is-danger">
                      {{ errors[0] }}
                    </p>
                  </div>
                </ValidationProvider>
              </div>

              <div class="field is-grouped">
                <p class="control">
                  <a
                    class="button"
                    :disabled="invalid"
                    @click="changePassword"
                  >{{ $t(Messages.SENT) }}</a>
                </p>
                <p class="control">
                  <a
                    class="button"
                    @click="reset"
                  >{{ $t(Messages.CANCEL) }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </div>

    <!-- Created -->
    <h2 class="title">
      {{ $t(Messages.MY_BOOKBOXES) }}:
    </h2>

    <book-info
      v-for="(box, idx) in created"
      :key="'box_' + idx"
      :bookbox="box"
      type="created"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Messages from '../assets/lang/messages';

import BookInfo from '../components/BookInfo';

export default {
  name: 'Profile',
  components: {
    BookInfo,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      Messages,
      editUser: false,
      showNotification: false,
      errorMessages: []
    }
  },
  computed: {
    ...mapState('User', ['userId', 'isLoggedIn', 'token', 'username']),
    created () {
      return this.$store.getters['BookStorage/created'](this.userId);
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
    passwordOld: {
      get () {
        return this.$store.state.User.passwordOld;
      },
      set (value) {
        this.$store.commit('User/setPasswordOld', value);
      }
    },
    mail () {
      return this.$store.state.User.email;
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
  watch: {
    async isLoggedIn () {
      if (this.isLoggedIn) {
        await this.getUserProfile();
        await this.getBookBoxInfosByUser();
      }
    }
  },
  async mounted () {
    if (this.isLoggedIn) {
      await this.getUserProfile();
      await this.getBookBoxInfosByUser();
    } else {
      this.$router.push({ path: 'login' });
    }
  },
  methods: {
    async logoutUser () {
      await this.$store.commit('User/logout');
      await this.$store.commit('BookStorage/setFavorites', []);
      this.$router.push({ path: 'login' });
    },
    async getBookBoxInfosByUser () {
      const user = {
        userId: this.userId,
        token: this.token
      };
      await this.$store.dispatch('BookStorage/getBookBoxInfosByUser', user);
    },
    async getUserProfile () {
      await this.$store.dispatch('User/getProfile');
    },
    hints (hints) {
      return hints ? hints.split('\n') : [];
    },
    async changePassword () {
      const isValid = await this.$refs.changeObserver.validate();
      if (!isValid || this.password !== this.passwordConfirmation) return;
      try {
        await this.$store.dispatch('User/changePassword');
        this.errors.clear();
        this.editUser = false;
      } catch (e) {
        this.showNotification = true;

        if (e.response.status === 401) {
          this.errorMessages = [];
          this.errorMessages.push(Messages.CHANGE_PASSWORD_FAILED);
          this.errorMessages.push(Messages.WRONG_PASSWORD);
        }
      }
    },
    reset () {
      this.editUser = false;
      this.password = '';
      this.passwordConfirmation = '';
      this.passwordOld = '';
    }
  }
};
</script>

<style scoped src="../assets/css/pages/profile.css">
</style>

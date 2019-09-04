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

    <!-- Personal Data -->
    <div class="box">
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
          {{ $t(Messages.PASSWORD) }}:
        </label>
        <div class="control" />
        <div class="field">
          <div class="control">
            <input
              v-model="passwordOld"
              v-validate="'required'"
              :data-vv-as="$t(Messages.OLD_PASSWORD)"
              :name="Messages.OLD_PASSWORD"
              class="input"
              type="password"
              :placeholder="!editUser ? '******' : $t(Messages.OLD_PASSWORD)"
              :disabled="!editUser"
            >
          </div>
        </div>

        <div
          v-if="editUser"
        >
          <div class="field">
            <div class="control">
              <input
                :ref="Messages.PASSWORD"
                v-model="password"
                v-validate="'required'"
                :data-vv-as="$t(Messages.PASSWORD)"
                :name="Messages.PASSWORD"
                class="input"
                type="password"
                :placeholder="$t(Messages.NEW_PASSWORD)"
              >
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="passwordConfirmation"
                v-validate="validateConfirmPassword"
                class="input"
                :data-vv-as="$t(Messages.CONFIRM_NEW_PASSWORD)"
                :name="Messages.CONFIRM_NEW_PASSWORD"
                type="password"
                :placeholder="$t(Messages.CONFIRM_NEW_PASSWORD)"
              >
              <p class="help is-danger">
                {{ errors.first(Messages.CONFIRM_NEW_PASSWORD) }}
              </p>
            </div>
          </div>

          <div class="field is-grouped">
            <p class="control">
              <a
                class="button"
                :disabled="errors.any()"
                @click="changePassword"
              >{{ $t(Messages.SENT) }}</a>
            </p>
            <p class="control">
              <a
                class="button"
                @click="editUser = false"
              >{{ $t(Messages.CANCEL) }}</a>
            </p>
          </div>
        </div>
      </div>
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
import Messages from '../assets/lang/messages';

import BookInfo from '../components/BookInfo';

export default {
  name: 'Profile',
  components: {
    BookInfo
  },
  data () {
    return {
      Messages,
      editUser: false
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
    validateConfirmPassword () {
      return `required|confirmed:${Messages.PASSWORD}`;
    },
    validForm () {
      return !this.errors.any();
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
      if (!this.validForm || this.password !== this.passwordConfirmation) return;
      await this.$store.dispatch('User/changePassword');
      this.errors.clear();
      this.editUser = false;
    }
  }
};
</script>

<style scoped src="../assets/css/pages/profile.css">
</style>

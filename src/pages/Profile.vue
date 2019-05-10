<template>
  <div
    id="profile"
  >
    <h1 class="title">
      {{ $t(Messages.PROFILE) }}

      <img
        v-if="isLoggedIn"
        src="../assets/img/edit.svg"
        alt="edit-icon"
        style="cursor: pointer"
        @click="changePassword = !changePassword"
      >

      <a
        v-if="isLoggedIn"
        class="button is-link is-pulled-right"
        @click="logoutUser"
      >Logout</a>
    </h1>

    <LoginForm
      v-if="!isLoggedIn"
      @userLoggedIn="getBookBoxInfosByUser"
    />

    <div
      v-else
    >
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
          <td>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="password"
                  :placeholder="$t(Messages.OLD_PASSWORD)"
                  :disabled="!changePassword"
                  :value="maskPassword"
                >
              </div>
            </div>

            <div
              v-if="changePassword"
            >
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    :placeholder="$t(Messages.NEW_PASSWORD)"
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    :placeholder="$t(Messages.CONFIRM_NEW_PASSWORD)"
                  >
                </div>
              </div>

              <div class="field is-grouped">
                <p class="control">
                  <a class="button">{{ $t(Messages.SENT) }}</a>
                </p><p class="control">
                  <a
                    class="button"
                    @click="changePassword = false"
                  >{{ $t(Messages.CANCEL) }}</a>
                </p>
              </div>
            </div>
          </td>
        </div>
      </div>

      <!-- Created -->
      <h2 class="title">
        Meine Bücherboxen:
      </h2>
      <div
        v-for="(box, idx) in created"
        :key="idx"
        class="box"
      >
        <h3>{{ box.description }}</h3>
        <p><label class="label">Ort:</label> {{ box.location }}</p>
        <label class="label">
          {{ $t(Messages.HINT) }}:
        </label>
        <ul>
          <li
            v-for="(hint, idx) in hints(box.hint)"
            :key="idx"
          >
            {{ hint }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';

import LoginForm from '../components/LoginForm';

export default {
  name: 'Profile',
  components: {
    LoginForm
  },
  data () {
    return {
      Messages,
      changePassword: false,
      maskPassword: '******'
    }
  },
  computed: {
    ...mapState('BookStorage', ['created']),
    ...mapState('User', ['userId', 'isLoggedIn', 'token', 'username'])
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
    }
  },
  methods: {
    async logoutUser () {
      await this.$store.commit('User/logout');
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
    }
  }
};
</script>

<style scoped src="../assets/css/pages/profile.css">
</style>

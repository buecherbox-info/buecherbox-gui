<template>
  <div id="profile">
    <h1>
      {{ $t(Messages.PROFILE) }}

      <img
        v-if="isLoggedIn && !changePassword"
        src="../assets/img/edit.svg"
        alt="edit-icon"
        @click="changePassword = true"
      >

      <span
        v-if="isLoggedIn"
        class="logout"
        @click="logoutUser"
      >Logout</span>
    </h1>

    <LoginForm
      v-if="!isLoggedIn"
      @userLoggedIn="getBookBoxInfosByUser"
    />

    <div v-else>
      <!-- Personal Data -->
      <table>
        <tr>
          <td>{{ $t(Messages.USERNAME) }}:</td>
          <td>{{ username }}</td>
        </tr>
        <tr>
          <td>{{ $t(Messages.PASSWORD) }}:</td>
          <td>
            {{ maskPassword }}

            <div v-if="changePassword">
              <input :placeholder="$t(Messages.OLD_PASSWORD)">
              <br>
              <input :placeholder="$t(Messages.NEW_PASSWORD)">
              <br>
              <input :placeholder="$t(Messages.CONFIRM_NEW_PASSWORD)">
              <br>
              <button>{{ $t(Messages.SENT) }}</button>
              <button @click="changePassword = false">
                {{ $t(Messages.CANCEL) }}
              </button>
            </div>
          </td>
        </tr>
      </table>

      <!-- Created -->
      <h2>Meine Bücherboxen:</h2>
      <div
        v-for="(box, idx) in created"
        :key="idx"
        class="book-box-info"
      >
        <h3>{{ box.description }}</h3>
        <p>Ort: {{ box.location }}</p>
        <p>Hinweis: {{ box.hint }}</p>
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
    ...mapState('User', ['userId', 'isLoggedIn', 'token', 'username']),
    maskPassword1 () {
      return this.changePassword ? '' : '******';
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
    }
  }
};
</script>

<style scoped>
@import "../assets/css/pages/profile.css";
</style>

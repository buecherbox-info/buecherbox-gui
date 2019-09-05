<template>
  <div
    id="dashboard"
    class="content"
  >
    <h1>Dashboard</h1>

    <article class="message">
      <div class="message-header">
        <p>Bücherboxen ({{ targets.length }})</p>
        <button
          class="delete"
          aria-label="delete"
          @click="showBookboxes = !showBookboxes"
        />
      </div>
      <div
        v-if="showBookboxes"
        class="message-body"
      >
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Favorites</th>
              <th>Description</th>
              <th>Location</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Hint</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="target in targets"
              :key="target.id"
            >
              <td
                class="map-link"
                @click="showOnMap(target.id)"
              >
                {{ target.id }}
              </td>
              <td>{{ target.username }}</td>
              <td>{{ target.favorites }}</td>
              <td>{{ target.description }}</td>
              <td>{{ target.location }}</td>
              <td>{{ target.lat }}</td>
              <td>{{ target.lng }}</td>
              <td>{{ target.hint }}</td>
              <td>{{ splitDate(target.created) }}</td>
              <td>{{ splitDate(target.updated) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article class="message">
      <div class="message-header">
        <p>Benutzer ({{ users.length }})</p>
        <button
          class="delete"
          aria-label="delete"
          @click="showUsers = !showUsers"
        />
      </div>
      <div
        v-if="showUsers"
        class="message-body"
      >
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Favorites</th>
              <th>Deleted</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Last_login</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.favorites }}</td>
              <td>
                <input
                  v-model="user.deleted"
                  type="checkbox"
                  disabled
                >
              </td>
              <td>{{ splitDate(user.created) }}</td>
              <td>{{ splitDate(user.updated) }}</td>
              <td>{{ splitDate(user.last_login) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      showBookboxes: false,
      showUsers: false
    }
  },
  computed: {
    ...mapState('Dashboard', ['targets', 'users']),
    ...mapState('User', ['userId', 'isLoggedIn', 'token', 'username'])
  },
  async mounted () {
    if (this.isLoggedIn) {
      await this.getBookboxInfos();
      await this.getUserInfos();
    }
  },
  methods: {
    async getBookboxInfos () {
      await this.$store.dispatch('Dashboard/getBookBoxInfos', this.token);
    },
    async getUserInfos () {
      await this.$store.dispatch('Dashboard/getUserInfos', this.token);
    },
    splitDate (fulldate) {
      if (!fulldate) return '';

      const splitted = fulldate.split('T');
      const date = splitted[0];
      const time = splitted[1].split('.')[0];
      return `${date}\n${time}`
    },
    showOnMap (bookboxId) {
      this.$router.push({
        path: '/',
        query: { bookbox: bookboxId }
      });
    }
  }
}
</script>

<style scoped>
/* ToDo fix word-break */
td {
  word-break: break-all;
}

.table {
  table-layout: fixed;
  background-color: transparent;
}

.map-link {
  cursor: pointer;
}
</style>

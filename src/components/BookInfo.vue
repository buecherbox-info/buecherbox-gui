<template>
  <div class="box">
    <p class="title">
      <span
        v-if="!edit"
        style="cursor: pointer"
        :title="$t(Messages.SHOW_ON_MAP)"
        @click="showOnMap"
      >
        {{ bookbox.description }}
      </span>

      <input
        v-else
        v-model="editInfos.description"
        class="input"
      >

      <img
        v-if="type === 'favorite'"
        src="../assets/img/trash-2.svg"
        style="cursor: pointer;"
        :title="$t(Messages.REMOVE_FAVORITE)"
        @click="deleteFavorite"
      >

      <img
        v-if="type === 'created' && !edit"
        src="../assets/img/edit.svg"
        style="cursor: pointer;"
        :title="$t('Bearbeiten')"
        @click="edit = true"
      >
    </p>

    <p class="subtitle">
      {{ bookbox.location }}
    </p>

    <!-- Image -->
    <figure
      v-if="!edit"
      class="image"
    >
      <img
        :src="imgSrc"
        alt="Image"
      >
    </figure>
    <input
      v-else
      type="file"
      @change="setFile"
    >

    <!-- Hint -->
    <label class="label">
      {{ $t(Messages.HINT) }}:
    </label>

    <ul v-if="!edit">
      <li
        v-for="(hint, idx) in hints"
        :key="'hint_' + idx"
      >
        {{ hint }}
      </li>
    </ul>

    <textarea
      v-else
      v-model="editInfos.hint"
      class="textarea"
    />

    <br>

    <!-- Buttons -->
    <div
      v-if="edit"
      class="field is-grouped"
    >
      <p class="control">
        <a
          class="button"
          @click="saveEdit"
        >
          {{ $t(Messages.SENT) }}
        </a>
      </p>
      <p class="control">
        <a
          class="button"
          @click="cancelEdit"
        >
          {{ $t(Messages.CANCEL) }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import * as BookBox from '../lib/BookBox';
import { mapState } from 'vuex';
import Messages from '../assets/lang/messages';

export default {
  name: 'BookInfo',
  props: {
    bookbox: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data () {
    return {
      Messages,
      edit: false,
      editInfos: {
        description: this.bookbox.description,
        image: null,
        hint: this.bookbox.hint
      }
    };
  },
  computed: {
    ...mapState('User', ['userId', 'token']),
    hints () {
      return this.bookbox.hint ? this.bookbox.hint.split('\n') : [];
    },
    imgSrc () {
      const imgId = this.bookbox.imgid;
      return imgId ? `http://localhost:3000/images/${imgId}` : '';
    }
  },
  methods: {
    async deleteFavorite () {
      const favorite = {
        userId: this.userId,
        token: this.token,
        bookboxId: this.bookbox.id
      };
      await this.$store.dispatch('BookStorage/deleteFavorite', favorite);
    },
    showOnMap () {
      this.$router.push({
        path: '/',
        query: { bookbox: this.bookbox.id }
      });
    },
    async saveEdit () {
      if (this.edit) {
        // ToDo create better alert
        alert('Wirklich bestätigen?');
      }

      const updated = {
        id: this.bookbox.id,
        description: this.editInfos.description,
        hint: this.editInfos.hint,
        img: this.editInfos.imgsrc
      };

      const updatedBox = await BookBox.updateBookBoxInfos(this.userId, this.token, updated);

      this.$store.commit('BookStorage/updateTarget', updatedBox);

      this.edit = false;
    },
    cancelEdit () {
      this.edit = false;
      this.editInfos = {
        description: this.bookbox.description,
        image: null,
        hint: this.bookbox.hint
      };
    },
    setFile (event) {
      const files = event.target.files || event.dataTransfer.files;
      if (files.length) {
        this.editInfos.imgsrc = files[0];
      }
    }
  }
};
</script>

<style scoped>

</style>

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
import { EventNames } from '../plugins/events';
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
    }
  },
  computed: {
    hints () {
      return this.bookbox.hint ? this.bookbox.hint.split('\n') : [];
    },
    imgSrc () {
      const imgId = this.bookbox.imgid;
      return imgId ? `http://localhost:3000/images/${imgId}` : '';
    }
  },
  methods: {
    deleteFavorite () {
      this.$emit(EventNames.DELETE_FAVORITE, this.bookbox.id);
    },
    showOnMap () {
      this.$router.push({ path: '/', query: { bookbox: this.bookbox.id } });
    },
    saveEdit () {
      if (this.edit) {
        alert('Wirklich bestätigen?');
      }

      this.edit = false;
    },
    cancelEdit () {
      this.edit = false;
      this.editInfos = {
        description: this.bookbox.description,
        image: null,
        hint: this.bookbox.hint
      }
    }
  }
}
</script>

<style scoped>

</style>

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from './assets/lang/de';
import en from './assets/lang/en';

Vue.use(VueI18n);

const messages = {
  de,
  en
};

export default new VueI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages
});

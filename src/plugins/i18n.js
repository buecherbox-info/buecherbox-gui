import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from '../assets/lang/de';
import en from '../assets/lang/en';
import es from '../assets/lang/es';
import fr from '../assets/lang/fr';
import it from '../assets/lang/it';
import nl from '../assets/lang/nl';
import pl from '../assets/lang/pl';
import pt from '../assets/lang/pt';
import ru from '../assets/lang/ru';

Vue.use(VueI18n);

const I18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
    es,
    fr,
    it,
    nl,
    pl,
    pt,
    ru
  }
});

export default I18n;

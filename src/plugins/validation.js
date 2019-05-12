import I18n from './i18n';

import deValidation from 'vee-validate/dist/locale/de';
import enValidation from 'vee-validate/dist/locale/en';
import esValidation from 'vee-validate/dist/locale/es';
import frValidation from 'vee-validate/dist/locale/fr';
import itValidation from 'vee-validate/dist/locale/it';
import nlValidation from 'vee-validate/dist/locale/nl';
import plValidation from 'vee-validate/dist/locale/pl';
import ruValidation from 'vee-validate/dist/locale/ru';

export default {
  i18n: I18n,
  dictionary: {
    de: deValidation,
    en: enValidation,
    es: esValidation,
    fr: frValidation,
    it: itValidation,
    nl: nlValidation,
    pl: plValidation,
    ru: ruValidation
  },
  classes: true,
  classNames: {
    invalid: 'is-danger'
  }
}

import I18n from './i18n';
import owasp from 'owasp-password-strength-test';
import { Validator } from 'vee-validate';

import deValidation from 'vee-validate/dist/locale/de';
import enValidation from 'vee-validate/dist/locale/en';
import esValidation from 'vee-validate/dist/locale/es';
import frValidation from 'vee-validate/dist/locale/fr';
import itValidation from 'vee-validate/dist/locale/it';
import nlValidation from 'vee-validate/dist/locale/nl';
import plValidation from 'vee-validate/dist/locale/pl';
import ruValidation from 'vee-validate/dist/locale/ru';

let errors = [];

Validator.extend('password', {
  getMessage (field) {
    return errors.join(' ');
  },
  validate (value) {
    const error = owasp.test(value);
    errors = error.errors;
    return error.strong;
  }
});

export default {
  i18n: I18n,
  dictionary: {
    de: {
      messages: {
        ...deValidation.messages,
        password: 'A-Z,a-z,0-9,§%/!&@#+-/, mind. 10 Zeichen'
      }
    },
    en: {
      de: {
        messages: {
          ...enValidation.messages,
          password: 'A-Z,a-z,0-9,§%/!&@#+-/, at least 10 characters'
        }
      }
    },
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

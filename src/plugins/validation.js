import { required, confirmed, email } from 'vee-validate/dist/rules';
import { configure, extend, localize } from 'vee-validate';

import deValidation from 'vee-validate/dist/locale/de';
import enValidation from 'vee-validate/dist/locale/en';
import esValidation from 'vee-validate/dist/locale/es';
import frValidation from 'vee-validate/dist/locale/fr';
import itValidation from 'vee-validate/dist/locale/it';
import nlValidation from 'vee-validate/dist/locale/nl';
import plValidation from 'vee-validate/dist/locale/pl';
import ruValidation from 'vee-validate/dist/locale/ru';

configure({
  classes: {
    invalid: 'is-danger',
    valid: 'is-success'
  }
});

extend('required', required);
extend('confirmed', confirmed);
extend('email', email);
extend('password', {
  validate: (value, { other }) => value === other,
  message: 'The password confirmation does not match.',
  params: [{ name: 'other', isTarget: true }]
});

localize({
  de: deValidation,
  en: enValidation,
  es: esValidation,
  fr: frValidation,
  it: itValidation,
  nl: nlValidation,
  pl: plValidation,
  ru: ruValidation
});

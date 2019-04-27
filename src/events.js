import Vue from 'vue';

export const EventNames = {
  FOCUS_INFOBOX: 'focusInfobox',
  LOGIN_ROUTE: 'routeToLogin',
  SHOW_EDIT_INFO: 'showEditInfo'
};

export const EventBus = new Vue();

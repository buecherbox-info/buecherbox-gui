import Vue from 'vue';

export const EventNames = {
  FOCUS_INFOBOX: 'focusInfobox',
  LOGIN_ROUTE: 'routeToLogin',
  SHOW_EDIT_INFO: 'showEditInfo',
  USER_LOGGED_IN: 'userLoggedIn',
  USER_LOGGED_OUT: 'userLoggedOut',
  SAVE_NEW_BOOKBOX: 'saveNewBookbox',
  TOGGLE_SIDEBAR: 'toggleSidebar'
};

export const EventBus = new Vue();

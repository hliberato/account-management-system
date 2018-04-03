/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   29-03-2018
 * @Last modified by:   hliberato
 * @Last modified time: 03-04-2018
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDialog: false,
    userToEdit: null,
  },
  mutations: {
    showCreateUserDialog(state) {
      // eslint-disable-next-line
      state.userDialog = true;
      // eslint-disable-next-line
      state.userToEdit = null;
    },
    hideUserDialog(state) {
      // eslint-disable-next-line
      state.userDialog = false;
    },
    showEditUserDialog(state, user) {
      // eslint-disable-next-line
      state.userToEdit = user;
      // eslint-disable-next-line
      state.userDialog = true;
    },
  },
  actions: {

  },
});

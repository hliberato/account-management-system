/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   29-03-2018
 * @Last modified by:   hliberato
 * @Last modified time: 02-04-2018
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDialog: false,
  },
  mutations: {
    showUserDialog(state) {
      // eslint-disable-next-line
      state.userDialog = true;
    },
    hideUserDialog(state) {
      // eslint-disable-next-line
      state.userDialog = false;
    },
  },
  actions: {

  },
});

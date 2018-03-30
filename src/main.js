/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   29-03-2018
 * @Last modified by:   hliberato
 * @Last modified time: 30-03-2018
 */

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vue from 'vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueFire);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyA0fcPagBP9H-QK3gmiJ2EKJrm89dOlN_I',
  authDomain: 'project-deal-with-it.firebaseapp.com',
  databaseURL: 'https://project-deal-with-it.firebaseio.com',
  projectId: 'project-deal-with-it',
  storageBucket: 'project-deal-with-it.appspot.com',
  messagingSenderId: '21134611106',
};

const unsubscribe = firebase.initializeApp(firebaseConfig).auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    render: h => h(App),
    data() {
      return {
        db: firebase.database(),
      };
    },
  }).$mount('#app');
  unsubscribe();
});

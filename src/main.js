/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   29-03-2018
 * @Last modified by:   hliberato
 * @Last modified time: 03-04-2018
 */

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vuelidate from 'vuelidate';
import Vue from 'vue';
import moment from 'moment';
import firebase from 'firebase';
import VueFire from 'vuefire';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuelidate);
Vue.use(VueFire);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
  if (!value) return '';
  return moment(value).format('MM/DD/YY HH:mm');
});

const firebaseConfig = {
  apiKey: 'AIzaSyDBQfeAOCyAwc-etrf_nRSq1qonDPs9shA',
  authDomain: 'accms-968ae.firebaseapp.com',
  databaseURL: 'https://accms-968ae.firebaseio.com',
  projectId: 'accms-968ae',
  storageBucket: 'accms-968ae.appspot.com',
  messagingSenderId: '74271336906',
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

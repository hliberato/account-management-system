/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   29-03-2018
 * @Last modified by:   hliberato
 * @Last modified time: 30-03-2018
 */

// import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Management from './views/Management.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Log from './views/Log.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Management',
      component: Management,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/logs',
      name: 'log',
      component: Log,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !firebase.auth().currentUser) next('login');
//   else next();
// });

export default router;

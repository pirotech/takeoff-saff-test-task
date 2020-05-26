import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage';
import MainPage from '../views/MainPage';
import store from '../store';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    exact: true
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthorized = store.getters.isAuthorized;
  if (to.fullPath !== '/login' && !isAuthorized) {
    next('/login');
  } else if (to.fullPath === '/login' && isAuthorized) {
    next('/');
  } else {
    next();
  }
});

export default router

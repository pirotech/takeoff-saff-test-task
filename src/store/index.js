import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const token = localStorage.getItem('token');

const LOGIN = 'LOGIN';

const store = new Vuex.Store({
  state: {
    token: token || ''
  },
  getters: {
    isAuthorized: state => {
      return !!state.token;
    }
  },
  mutations: {
    [LOGIN]: (state, payload) => {
      console.log('hello');
      const { username, password } = payload;
      if (!!username && !!password) {
        const token = '12345';
        localStorage.setItem('token', token);
        state.token = token;
      }
    }
  },
  actions: {
    [LOGIN]: ({commit}, payload) => {
      setTimeout(() => {
        const { username, password } = payload;
        commit({
          type: LOGIN,
          username,
          password
        });
      }, 1000);
    }
  }
});

export default store;

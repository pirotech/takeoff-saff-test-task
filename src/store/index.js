import Vue from 'vue';
import Vuex from 'vuex';
import authApi from '../api/auth';
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
      const { token } = payload;
      localStorage.setItem('token', token);
      state.token = token;
    }
  },
  actions: {
    [LOGIN]: ({commit}, payload) => {
      const { username, password } = payload;

      authApi.login(username, password).then(response => {
        const { token } = response.data;
        commit({
          type: LOGIN,
          token
        });
      }).catch(error => {
        console.error(error);
      });
    }
  }
});

export default store;

import instance from './index';

const authApi = {
  login: (username = '', password = '') => {
    return instance.get('/auth', {
      params: {
        username,
        password
      }
    });
  }
};

export default authApi;

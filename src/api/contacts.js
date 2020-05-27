import instance from './index';

const contactsApi = {
  getContacts: () => {
    return instance.get('/contacts');
  }
};

export default contactsApi;

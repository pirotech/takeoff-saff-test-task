import instance from './index';

const contactsApi = {
  getContacts: () => {
    return instance.get('/contacts');
  },
  addContact: (name = '', phone = '') => {
    return instance.post('/contacts', {
      id: Math.round(Math.random() * 1000),
      name,
      phone,
    });
  },
  removeContact: (item) => {
    return instance.delete(`/contacts/${item.id}`);
  }
};

export default contactsApi;

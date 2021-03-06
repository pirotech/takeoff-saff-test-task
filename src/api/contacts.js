import instance from './index';

const contactsApi = {
  getContacts: (q = '') => {
    return instance.get(`/contacts?q=${q}`);
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
  },
  editContact: (item) => {
    return instance.put(`/contacts/${item.id}`, item);
  }
};

export default contactsApi;

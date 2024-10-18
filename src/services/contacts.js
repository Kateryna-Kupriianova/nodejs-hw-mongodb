import Contact from '../models/contacts.js';

const getContacts = async () => {
  try {
    // Отримання всіх контактів з бази даних
    return await Contact.find();
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving contacts');
  }
};

export default {
  getContacts,
};



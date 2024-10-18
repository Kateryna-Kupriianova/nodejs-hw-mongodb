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
const getContactById = async (contactId) => {
    try {
        // Отримання контакту за його ID
        return await Contact.findById(contactId);
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving contact');
    }
};

export default {
    getContacts,
    getContactById
};



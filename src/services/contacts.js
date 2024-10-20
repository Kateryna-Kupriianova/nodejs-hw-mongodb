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

const addContact = async (contact) => {
    try {
        // Додавання нового контакту до бази даних
        return await Contact.create(contact);
    } catch (error) {
        console.error(error);
        throw new Error('Error adding contact');
    }
};

const updateContact = async (contactId, contact) => {
    try {
        // Оновлення контакту у базі даних
        return await Contact.findByIdAndUpdate(contactId, contact, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating contact');
    }
};

const deleteContact = async (contactId) => {
    try {
        // Видалення контакту з бази даних
        return await Contact.findByIdAndDelete(contactId);
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting contact');
    }
  
}
// export async function addContact (contact) {
//     try {
//         // Додавання нового контакту до бази даних
//         return await Contact.create(contact);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Error adding contact');
//     }
// };

export default {
    getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact
    
};



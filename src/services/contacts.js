import Contact from '../models/contacts.js';

const getContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  try {
      const skip = page > 0 ? (page - 1) * perPage : 0;

      const [total, contacts] = await Promise.all([
          Contact.countDocuments(),
          Contact.find()
              .sort({ [sortBy]: sortOrder })
              .skip(skip)
              .limit(perPage),
      ]);
      const totalPages = Math.ceil(total / perPage);
      return {
          contacts,
          page,
          perPage,
          totalItems: total,
          totalPages,
          hasNextPage: totalPages-page > 0,
          hasPreviousPage: page > 1
      };

  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving contacts');
  }
};
const getContactById = async (contactId) => {
    try {

        return await Contact.findById(contactId);
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving contact');
    }
};

const addContact = async (contact) => {
    try {

        return await Contact.create(contact);
    } catch (error) {
        console.error(error);
        throw new Error('Error adding contact');
    }
};

const updateContact = async (contactId, contact) => {
    try {

        return await Contact.findByIdAndUpdate(contactId, contact, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating contact');
    }
};

const deleteContact = async (contactId) => {
    try {

        return await Contact.findByIdAndDelete(contactId);
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting contact');
    }

}


export default {
    getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact

};



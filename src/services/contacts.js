import Contact from '../models/contacts.js';

const getContacts = async ({ page, perPage, sortBy, sortOrder, userId }) => {
  try {
      const skip = page > 0 ? (page - 1) * perPage : 0;

      const [total, contacts] = await Promise.all([
          Contact.countDocuments({ userId }),
          Contact.find({ userId }).populate('userId')
              .sort({ [sortBy]: sortOrder })
              .skip(skip)
              .limit(perPage),

      ]);

      const totalPages = Math.ceil(total / perPage);
      return {
          data: contacts,
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
const getContactById = async (contactId, userId) => {
    try {

        return await Contact.findOne({ _id: contactId, userId }).populate(contactId);
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

const updateContact = async (contactId, contact, userId) => {
    try {

        return await Contact.findOneAndUpdate({ _id: contactId, userId }, contact, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error updating contact');
    }
};

const deleteContact = async (contactId, userId) => {
    try {

        return await Contact.findOneAndDelete({ _id: contactId, userId });
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



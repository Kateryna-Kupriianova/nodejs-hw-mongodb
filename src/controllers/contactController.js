import contactService from '../services/contacts.js';


const getContacts = async (req, res) => {
  
    const contacts = await contactService.getContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
      
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  
    const contact = await contactService.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
      
};

export default {
    getContacts,
    getContactById
};

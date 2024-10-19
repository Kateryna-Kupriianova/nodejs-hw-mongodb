import createHttpError from 'http-errors';
import contactService from '../services/contacts.js';
import { addContact } from '../services/contacts.js'; 


const getContacts = async (req, res) => {
  
    const contacts = await contactService.getContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
      
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  
    const contact = await contactService.getContactById(contactId);
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
      
};

export async function addContactController(req, res) {
  const contact={
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType
  }
   const result = await addContact(contact);
  console.log(result);
  res.send("Add contact");
      
};

export default {
  getContacts,
  getContactById,
  addContactController
};

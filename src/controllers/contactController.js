import createHttpError from 'http-errors';
import contactService from '../services/contacts.js'; 


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

const addContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType
  };
  const result = await contactService.addContact(contact);
  console.log(result);
  res.send("Add contact");
      
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType
  };
  const result = await contactService.updateContact(contactId, contact);
  console.log(result);
  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  })
      
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactService.deleteContact(contactId);
  console.log(result);
  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully deleted a contact!',
    data: result,
  })
      
};

// export async function addContactController(req, res) {
//   const contact={
//     name: req.body.name,
//     phoneNumber: req.body.phoneNumber,
//     email: req.body.email,
//     isFavourite: req.body.isFavourite,
//     contactType: req.body.contactType
//   }
//    const result = await addContact(contact);
//   console.log(result);
//   res.send("Add contact");
      
// };

export default {
  getContacts,
  getContactById,
  addContactController,
  updateContactController,
  deleteContactController
};

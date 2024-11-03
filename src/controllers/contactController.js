import createHttpError from 'http-errors';
import contactService from '../services/contacts.js';
import { parsPaginationsParams } from '../utils/parsPaginationsParams.js';
import {parseSortParams} from '../utils/parseSortParams.js';
const getContacts = async (req, res) => {
  console.log(req.user);
  const { page, perPage } = parsPaginationsParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const data = await contactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.userId
  });
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data,
    });


};



const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

    const contact = await contactService.getContactById(contactId, req.user.userId);
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
    contactType: req.body.contactType,
    userId: req.user.userId
  };
  const result = await contactService.addContact(contact);
  console.log(result);
  res.status(201).json({
    status: 201,
    message: 'Add contact!',
    data: result,
  })

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
  const result = await contactService.updateContact(contactId, req.user.userId, contact);
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
  const result = await contactService.deleteContact(contactId, req.user.userId);
  console.log(result);
  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(204).json({status: 204})

};



export default {
  getContacts,
  getContactById,
  addContactController,
  updateContactController,
  deleteContactController
};

import createHttpError from 'http-errors';
import contactService from '../services/contacts.js';
import { parsPaginationsParams } from '../utils/parsPaginationsParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import fs from 'node:fs/promises';
// import path from 'node:path';

import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
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

const addContactController = async (req, res, next) => {
   try {
        let photo = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            photo = result;
        }

        const contact = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            isFavourite: req.body.isFavourite,
            contactType: req.body.contactType,
            userId: req.user.userId,
            photo,
        };

        const result = await contactService.addContact(contact);
        res.status(201).json({
            status: 201,
            message: "Contact added successfully!",
            data: result,
        });
   } catch (error) {
        console.error(error);
        next(createHttpError(500, 'Failed to add contact'));
    }

};

const updateContactController = async (req, res, next) => {
  try {
        const { contactId } = req.params;
        let photo = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            photo = result;
        }

        const contact = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            isFavourite: req.body.isFavourite,
            contactType: req.body.contactType,
            ...(photo && { photo }),
        };

        const result = await contactService.updateContact(contactId, req.user.userId, contact);

        if (!result) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.status(200).json({
            status: 200,
            message: "Contact updated successfully!",
            data: result,
        });
  } catch (error) {
        console.error(error);
        next(createHttpError(500, 'Failed to update contact'));
    }

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

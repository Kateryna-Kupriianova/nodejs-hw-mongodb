import express from 'express';
import contactController from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
 
const router = express.Router();


router.get('/contacts', ctrlWrapper(contactController.getContacts));

router.get('/contacts/:contactId', ctrlWrapper(contactController.getContactById));


export default router;
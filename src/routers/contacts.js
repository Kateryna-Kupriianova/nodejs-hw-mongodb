import express from 'express';
import contactController from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addContactController } from '../controllers/contactController.js'; 
const router = express.Router();
const jsonParser = express.json({
    type: 'application/json',
});

router.get('/contacts', ctrlWrapper(contactController.getContacts));

router.get('/contacts/:contactId', ctrlWrapper(contactController.getContactById));

router.post('/contacts', jsonParser, ctrlWrapper(addContactController));
export default router;
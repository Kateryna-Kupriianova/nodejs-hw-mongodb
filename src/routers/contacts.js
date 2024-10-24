import express from 'express';
import contactController from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { addContactController } from '../controllers/contactController.js'; 
const router = express.Router();
// const jsonParser = express.json({
//     type: 'application/json',
// });

router.get('/contacts', ctrlWrapper(contactController.getContacts));

router.get('/contacts/:contactId', ctrlWrapper(contactController.getContactById));

router.post('/contacts', express.json(), ctrlWrapper(contactController.addContactController));

router.patch('/contacts/:contactId', express.json(), ctrlWrapper(contactController.updateContactController));

router.delete('/contacts/:contactId', ctrlWrapper(contactController.deleteContactController));
export default router;


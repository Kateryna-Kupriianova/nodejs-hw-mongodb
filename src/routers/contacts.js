import express from 'express';
import contactController from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
const router = express.Router();


router.get('/contacts', ctrlWrapper(contactController.getContacts));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(contactController.getContactById));

router.post('/contacts', express.json(), validateBody(contactSchema), ctrlWrapper(contactController.addContactController));

router.patch('/contacts/:contactId', isValidId, express.json(), ctrlWrapper(contactController.updateContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(contactController.deleteContactController));
export default router;


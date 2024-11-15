import express from 'express';
import contactController from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();


router.get('/contacts', ctrlWrapper(contactController.getContacts));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(contactController.getContactById));

router.post('/contacts', upload.single('photo'), express.json(), validateBody(createContactSchema), ctrlWrapper(contactController.addContactController));

router.patch('/contacts/:contactId', upload.single('photo'), isValidId, express.json(), validateBody(updateContactSchema), ctrlWrapper(contactController.updateContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(contactController.deleteContactController));
export default router;


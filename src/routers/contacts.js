import express from 'express';
import contactController from '../controllers/contactController.js';
 
const router = express.Router();


router.get('/contacts', contactController.getContacts);

router.get('/contacts/:contactId', contactController.getContactById);


export default router;
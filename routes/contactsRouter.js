import express from 'express';
import {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactController,
  updateStatusContactController,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { addContactSchema, updateContactSchema, updateStatusContactSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContact);
contactsRouter.delete('/:id', deleteContact);
contactsRouter.post('/', validateBody(addContactSchema), createContact);
contactsRouter.put('/:id', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error('Body must have at least one field'));
  }
  next();
}, validateBody(updateContactSchema), updateContactController);

// Новый роут для обновления статуса favorite
contactsRouter.patch('/:contactId/favorite', validateBody(updateStatusContactSchema), updateStatusContactController);

export default contactsRouter;

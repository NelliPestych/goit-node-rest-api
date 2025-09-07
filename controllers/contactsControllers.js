import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contacts = await listContacts(owner);
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const contact = await getContactById(id, owner);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const removed = await removeContact(id, owner);
    if (!removed) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(removed);
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { id: owner } = req.user;
    const newContact = await addContact({ name, email, phone, owner });
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const updated = await updateContact(id, req.body, owner);
    if (!updated) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

export const updateStatusContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { id: owner } = req.user;
    
    const updated = await updateStatusContact(contactId, { favorite }, owner);
    if (!updated) {
      return next(HttpError(404, 'Not found'));
    }
    
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

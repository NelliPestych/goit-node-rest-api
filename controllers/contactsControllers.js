import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
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
    const removed = await removeContact(id);
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
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateContact(id, req.body);
    if (!updated) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

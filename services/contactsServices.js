import Contact from '../models/Contact.js';

export async function listContacts() {
  return await Contact.findAll();
}

export async function getContactById(id) {
  return await Contact.findByPk(id);
}

export async function removeContact(id) {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  
  await contact.destroy();
  return contact;
}

export async function addContact({ name, email, phone }) {
  return await Contact.create({ name, email, phone });
}

export async function updateContact(id, changes) {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  
  await contact.update(changes);
  return contact;
}

export async function updateStatusContact(id, { favorite }) {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  
  await contact.update({ favorite });
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

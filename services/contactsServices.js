import Contact from '../models/Contact.js';

export async function listContacts(owner) {
  return await Contact.findAll({ where: { owner } });
}

export async function getContactById(id, owner) {
  return await Contact.findOne({ where: { id, owner } });
}

export async function removeContact(id, owner) {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  
  await contact.destroy();
  return contact;
}

export async function addContact({ name, email, phone, owner }) {
  return await Contact.create({ name, email, phone, owner });
}

export async function updateContact(id, changes, owner) {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  
  await contact.update(changes);
  return contact;
}

export async function updateStatusContact(id, { favorite }, owner) {
  const contact = await Contact.findOne({ where: { id, owner } });
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

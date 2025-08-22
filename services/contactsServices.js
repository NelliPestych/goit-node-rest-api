import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json');

async function readDB() {
  const data = await fs.readFile(contactsPath, 'utf-8').catch(async (e) => {
    if (e.code === 'ENOENT') { await fs.writeFile(contactsPath, '[]'); return '[]'; }
    throw e;
  });
  return JSON.parse(data || '[]');
}

async function writeDB(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
  return await readDB();
}

export async function getContactById(id) {
  const contacts = await readDB();
  return contacts.find(c => String(c.id) === String(id)) || null;
}

export async function removeContact(id) {
  const contacts = await readDB();
  const idx = contacts.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return null;
  const [removed] = contacts.splice(idx, 1);
  await writeDB(contacts);
  return removed;
}

export async function addContact({ name, email, phone }) {
  const contacts = await readDB();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await writeDB(contacts);
  return newContact;
}

export async function updateContact(id, changes) {
  const contacts = await readDB();
  const idx = contacts.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...changes };
  await writeDB(contacts);
  return contacts[idx];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

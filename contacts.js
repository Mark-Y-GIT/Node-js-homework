const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const getData = await fs.readFile(contactsPath, 'utf-8');

    console.log('listContacts ok');

    return JSON.parse(getData);
  } catch (error) {
    console.log('listContacts error', error);
  }
}

async function getContactById(contactId) {
  try {
    const getData = await listContacts();

    const getContactById = getData.find(
      dbContact => dbContact.id === contactId,
    );

    console.log('getContactById ok');

    return getContactById ? getContactById : null;
  } catch (error) {
    console.log('getContactById error', error);
  }
}

async function removeContact(contactId) {
  try {
    const getData = await listContacts();

    const getContact = getData.filter(dbContact => dbContact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(getContact));
    const updatedData = await listContacts();
    console.log('removeContact ok');
    return updatedData;
  } catch (error) {
    console.log('removeContact error', error);
  }
}

async function addContact(name, phone, email) {
  try {
    const getData = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    getData.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(getData));
    console.log('addContact ok');
    return getData;
  } catch (error) {
    console.log('addContact error', error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };

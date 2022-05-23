const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts-copy.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

    console.log('listContacts ok');

    return JSON.parse(data);
  } catch (error) {
    console.log('listContacts not ok', error);
  }
}

// listContacts().then(data => {
//   console.log('listContacts', data);
// });

async function getContactById(contactId) {
  try {
    const data = await listContacts();

    const contactById = data.find(dbContact => dbContact.id === contactId);

    console.log('getContactById ok');

    return contactById ? contactById : null;
  } catch (error) {
    console.log('getContactById not ok', error);
  }
}

// getContactById('6').then(data => console.log(data));

async function removeContact(contactId) {
  try {
    const data = await listContacts();

    const getContact = data.filter(dbContact => dbContact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(getContact));
    console.log('removeContact ok');
  } catch (error) {
    console.log('removeContact not ok', error);
  }
}

// removeContact('IuxwpzpMk-8-hxk38YZ8o');

async function addContact({ name, email, phone }) {
  try {
    const data = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    data.push(newContact);
    console.log('addContact ok');

    await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (error) {
    console.log('addContact not ok', error);
  }
}

// const obj1 = { name: 'John', phone: '5555555', email: 'John@mail.com' };
// const obj2 = { name: 'Mango', phone: '66666', email: 'mango@mail.com' };

// addContact(obj1);

module.exports = { listContacts, getContactById, removeContact, addContact };

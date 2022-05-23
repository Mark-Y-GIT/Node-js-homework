const operation = require('./contacts');
// console.log(operation);

// operation.listContacts().then(data => {
//   console.log('listContacts', data);
// });

// operation.getContactById('6').then(data => console.log(data));

// operation.removeContact('5');

const obj1 = { name: 'John', phone: '5555555', email: 'John@mail.com' };
const obj2 = { name: 'Mango', phone: '66666', email: 'mango@mail.com' };

operation.addContact(obj2);

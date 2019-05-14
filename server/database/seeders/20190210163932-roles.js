export default {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    id: 18742,
    name: 'Super Admin',
    description: 'Can create and deactivate Admins and Employees',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9786,
    name: 'Admin',
    description: 'Can create and deactivate an employee',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 92786,
    name: 'Employee',
    description: 'Can do every thing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 34521,
    name: 'Client',
    description: 'The Insurance Companies',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 98536,
    name: 'Customers',
    description: 'The garage companies',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};

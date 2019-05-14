export default {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    roleId: 18742,
    userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 18742,
    userId: '122b0f86-8e78-5cc8-a28f-8e9f7811c457',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 9786,
    userId: '133b0f86-8e78-3bb4-a28f-8e9f7811c457',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleId: 92786,
    userId: '144b0f86-8e78-3bb4-a28f-8e9f7811c489',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};

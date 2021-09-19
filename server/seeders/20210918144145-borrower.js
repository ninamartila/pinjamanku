'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        firstName: "Borrower",
        lastName: "Borrower",
        email: "dharmasatrya10@gmail.com",
        password: "rahasia",
        address: "jakarta",
        birthDate: new Date(),
        bankCode: "BRI",
        holderName: "Dharma Satrya",
        accountNumber: 1234567890,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Borrowers', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Borrowers', null, {})
  }
};

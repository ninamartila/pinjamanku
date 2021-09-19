'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        firstName: "Lender",
        lastName: "Lender",
        email: "dharmasatrya10@gmail.com",
        password: "rahasia",
        address: "jakarta",
        birthDate: new Date(),
        bankCode: "BCA",
        holderName: "Dharma Satrya",
        accountNumber: 1234567890,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Lenders', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lenders', null, {})
  }
};

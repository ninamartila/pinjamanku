"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        firstName: "Lender",
        lastName: "Lender",
        email: "dharmasatrya10@gmail.com",
        password: "rahasia",
        ktpCard: "iniKtp",
        selfPicture: "iniProfPic",
        phoneNumber: "09192718",
        address: "jakarta",
        birthDate: new Date(),
        bankCode: "BCA",
        holderName: "Dharma Satrya",
        accountNumber: 1234567890,
        occupation: "Manager",
        role: "lender",
        status: "Verified",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Lenders", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lenders", null, {});
  },
};

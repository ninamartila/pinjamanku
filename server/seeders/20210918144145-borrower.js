"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        id: 1,
        firstName: "Borrower",
        lastName: "Borrower",
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
    data.forEach(element => {
      element.password = hashPassword(element.password)
    });
    await queryInterface.bulkInsert("Borrowers", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Borrowers", null, {});
  },
};

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Loans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      externalID: {
        type: Sequelize.STRING,
      },
      lenderID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Lenders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      borrowerID: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Borrowers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      initialLoan: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tenor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Loans");
  },
};

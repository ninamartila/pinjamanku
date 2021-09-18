"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Loan.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId cannot be null",
          },
          notEmpty: {
            msg: "UserId cannot be empty",
          },
        },
      },
      initialLoan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "initial loan cannot be null",
          },
          min: {
            args: 10000,
            msg: "initial loan cannot be lower than 10000",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "status cannot be null",
          },
          notEmpty: {
            msg: "status cannot be empty",
          },
        },
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "amount paid cannot be null",
          },
          min: {
            args: 10000,
            msg: "amount paid cannot be lower than 10000",
          },
        },
      },
      tenor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "tenor cannot be null",
          },
          min: {
            args: 30,
            msg: "tenor cannot be lower than 30 days",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (loan) => {
          loan.status = "available";
        },
      },
      sequelize,
      modelName: "Loan",
    }
  );
  return Loan;
};

"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Loan);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "first name cannot be null",
          },
          notEmpty: {
            msg: "first name cannot be empty",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "last name cannot be null",
          },
          notEmpty: {
            msg: "last name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email is already exists",
        },
        validate: {
          notNull: {
            msg: "email cannot be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be null",
          },
          notEmpty: {
            msg: "password cannot be empty",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phone number cannot be null",
          },
          notEmpty: {
            msg: "phone number cannot be empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address cannot be null",
          },
          notEmpty: {
            msg: "address cannot be empty",
          },
        },
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "birth date cannot be null",
          },
          notEmpty: {
            msg: "birth date cannot be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "role cannot be null",
          },
          notEmpty: {
            msg: "role cannot be empty",
          },
        },
      },
      bankCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "bank code cannot be null",
          },
          notEmpty: {
            msg: "bank code cannot be empty",
          },
        },
      },
      holderName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "holder name cannot be null",
          },
          notEmpty: {
            msg: "holder name cannot be empty",
          },
        },
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "account number cannot be null",
          },
          notEmpty: {
            msg: "account number cannot be empty",
          },
        },
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "occupation cannot be null",
          },
          notEmpty: {
            msg: "occupation cannot be empty",
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
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const sendMail = require("../helpers/NodeMailer");

class UserController {
  static async getAll(req, res, next) {
    try {
      const result = await User.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        birthDate,
        bankCode,
        holderName,
        accountNumber,
        occupation,
        role,
      } = req.body;

      let newUser = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        birthDate,
        bankCode,
        holderName,
        accountNumber,
        occupation,
        role,
      };
      const result = await User.create(newUser);
      const { password: resultPassword, ...toSend } = result;
      if (result) {
        if (sendMail(result.email)) {
          res.status(500).json(error);
        } else {
          res.status(200).json(toSend);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({ where: { email } });
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        password: userPassword,
        phoneNumber,
        address,
        birthDate,
        bankCode,
        holderName,
        accountNumber,
        occupation,
        role,
      } = result;
      const correctPassword = comparePassword(password, userPassword);
      if (correctPassword) {
        const userPayload = {
          id,
          firstName,
          lastName,
          email: userEmail,
          password: userPassword,
          phoneNumber,
          address,
          birthDate,
          bankCode,
          holderName,
          accountNumber,
          occupation,
          role,
        };
        const token = generateToken(userPayload);
        res.status(200).json({ access_token: token, id, firstName, lastName });
      } else {
        res.status(404).json({ message: "salah password" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.user;
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        birthDate,
        bankCode,
        holderName,
        accountNumber,
        occupation,
        role,
      } = req.body;
      let updatedUser = {};
      if (firstName !== "" && typeof firstName !== "undefined") {
        updatedUser = {
          ...updatedUser,
          firstName,
        };
      }
      if (lastName !== "" && typeof lastName !== "undefined") {
        updatedUser = {
          ...updatedUser,
          lastName,
        };
      }
      if (email !== "" && typeof email !== "undefined") {
        updatedUser = {
          ...updatedUser,
          email,
        };
      }
      if (password !== "" && typeof password !== "undefined") {
        updatedUser = {
          ...updatedUser,
          password,
        };
      }
      if (phoneNumber !== "" && typeof phoneNumber !== "undefined") {
        updatedUser = {
          ...updatedUser,
          phoneNumber,
        };
      }
      if (address !== "" && typeof address !== "undefined") {
        updatedUser = {
          ...updatedUser,
          address,
        };
      }
      if (birthDate !== "" && typeof birthDate !== "undefined") {
        updatedUser = {
          ...updatedUser,
          birthDate,
        };
      }
      if (bankCode !== "" && typeof bankCode !== "undefined") {
        updatedUser = {
          ...updatedUser,
          bankCode,
        };
      }
      if (holderName !== "" && typeof holderName !== "undefined") {
        updatedUser = {
          ...updatedUser,
          holderName,
        };
      }
      if (accountNumber !== "" && typeof accountNumber !== "undefined") {
        updatedUser = {
          ...updatedUser,
          accountNumber,
        };
      }
      if (occupation !== "" && typeof occupation !== "undefined") {
        updatedUser = {
          ...updatedUser,
          occupation,
        };
      }
      if (role !== "" && typeof role !== "undefined") {
        updatedUser = {
          ...updatedUser,
          role,
        };
      }
      const result = await User.update(updatedUser, { where: { id } });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateUserStatus(req, res, next) {
    const { userId } = req.params;
    const { status } = req.body;
    try {
      const userStatus = {
        status,
      };
      const result = await User.update(userStatus, { where: { id: userId } });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res, next) {
    const { userId } = req.params;
    try {
      const result = await User.destroy({ where: { id: userId } });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;

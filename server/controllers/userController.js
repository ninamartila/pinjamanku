const { Lender, Borrower, Staff } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const createRoom = require("../helpers/dailyCo");
const { isAdmin } = require("../helpers/admin");

class UserController {
  static async getAll(req, res, next) {
    try {
      const lender = await Lender.findAll();
      const borrower = await Borrower.findAll();

      res.status(200).json({
        lender,
        borrower,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async userById(req, res, next) {
    const { userId } = req.params;
    const { role } = req.query;
    try {
      if (role === "lender") {
        const lenderResult = await Lender.findOne({ where: { id: userId } });
        res.status(200).json(lenderResult);
      } else if (role === "borrower") {
        const borrowerResult = await Borrower.findOne({ where: { id: userId } });
        res.status(200).json(borrowerResult);
      } else {
        throw Error("role not valid");
      }
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
        ktpCard,
        selfPicture,
        phoneNumber,
        address,
        birthDate,
        bankCode,
        holderName,
        accountNumber,
        occupation,
        role,
      } = req.body;

      if (isAdmin(email)) {
        const newStaff = {
          name: `${firstName} ${lastName}`,
          email,
          password,
        };
        const createdStaff = await Staff.create(newStaff);
        const { password: passwordStaff, ...toSend } = createdStaff;
        if (createdStaff) {
          res.status(201).json(toSend);
        } else {
          throw Error("register error");
        }
      } else {
        if (role === "lender") {
          const newLender = {
            firstName,
            lastName,
            email,
            password,
            ktpCard,
            selfPicture,
            phoneNumber,
            address,
            birthDate,
            bankCode,
            holderName,
            accountNumber,
            occupation,
            role,
            status: "Verified",
          };
          const createdLender = await Lender.create(newLender);
          const { password: passwordStaff, ...toSend } = createdLender;
          if (createdLender) {
            res.status(201).json(toSend);
          } else {
            throw Error("register error");
          }
        } else if (role === "borrower") {
          const newBorrower = {
            firstName,
            lastName,
            email,
            password,
            ktpCard,
            selfPicture,
            phoneNumber,
            address,
            birthDate,
            bankCode,
            holderName,
            accountNumber,
            occupation,
            role,
            status: "Pending",
          };
          const checkRoom = await createRoom(`${email}`, email);
          if (checkRoom) {
            const createdBorrower = await Lender.create(newBorrower);
            const { password: passwordStaff, ...toSend } = createdBorrower;
            if (createdBorrower) {
              res.status(201).json(toSend);
            } else {
              throw Error("register error");
            }
          }
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

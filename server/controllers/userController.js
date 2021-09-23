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
      /* istanbul ignore next */
      next(error);
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
        next({
          name: "InvalidRole",
        });
      }
    } catch (error) {
      /* istanbul ignore next */
      next(error);
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

      if (isAdmin(email)) {
        const newStaff = {
          name: `${firstName} ${lastName}`,
          email,
          password,
        };
        const createdStaff = await Staff.create(newStaff);
        const { password: passwordStaff, ...toSend } = createdStaff;
        /* istanbul ignore else */
        if (createdStaff) {
          res.status(201).json(toSend);
        } else {
          next({
            name: "InvalidRegister",
          });
        }
      } else if (role === "lender") {
        const newLender = {
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
          status: "Verified",
        };
        const createdLender = await Lender.create(newLender);
        const { password: passwordStaff, ...toSend } = createdLender;
        /* istanbul ignore else */
        if (createdLender) {
          res.status(201).json(toSend);
        } else {
          next({
            name: "InvalidRegister",
          });
        }
      } else if (role === "borrower") {
        const currentDate = new Date();
        const newBorrower = {
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
          status: "Pending",
        };
        const checkRoom = await createRoom(`${firstName}${currentDate.getTime()}`, email);
        /* istanbul ignore next */
        if (checkRoom) {
          const createdBorrower = await Borrower.create(newBorrower);
          const { password: passwordStaff, ...toSend } = createdBorrower;
          /* istanbul ignore next */
          if (createdBorrower) {
            res.status(201).json({ ...toSend, dailyURL: checkRoom.dailyUrl });
          } else {
            next({
              name: "InvalidRegister",
            });
          }
        } else {
          next({
            name: "DailyCoError",
          });
        }
      } else {
        next({
          name: "InvalidEmail",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (isAdmin(email)) {
        const staffResult = await Staff.findOne({ where: { email } });
        if (staffResult) {
          const { id, name, email, password: staffPassword, role } = staffResult;
          const correctPassword = comparePassword(password, staffPassword);
          if (correctPassword) {
            const staffPayload = {
              id,
              name,
              email,
              role,
            };
            const token = generateToken(staffPayload);
            res.status(200).json({ access_token: token, id, name, role: "admin" });
          } else {
            next({
              name: "Unauthorized",
            });
          }
        } else {
          next({
            name: "Unauthorized",
          });
        }
      } else {
        const lenderResult = await Lender.findOne({ where: { email } });
        const borrowerResult = await Borrower.findOne({ where: { email } });
        let userResult;
        if (lenderResult) {
          userResult = lenderResult;
        }
        if (borrowerResult) {
          userResult = borrowerResult;
        }
        if (!userResult) {
          next({
            name: "Unauthorized",
          });
        }
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
        } = userResult;
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
          res.status(200).json({ access_token: token, id, firstName, lastName, role });
        } else {
          next({
            name: "Unauthorized",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id, role } = req.user;
      const { firstName, lastName, phoneNumber, address, bankCode, holderName, accountNumber } =
        req.body;
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
      if (role === "lender") {
        const result = await Lender.update(updatedUser, { where: { id } });
        res.status(200).json({ message: "User has been updated" });
      }

      if (role === "borrower") {
        const result = await Borrower.update(updatedUser, { where: { id } });
        res.status(200).json({ message: "User has been updated" });
      }
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }

  static async updateUserStatus(req, res, next) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      const userStatus = {
        status,
      };
      const result = await Borrower.update(userStatus, { where: { id: userId } });
      res.status(200).json({ message: "User status has been updated" });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.query;
      if (role === "lender") {
        const result = await Lender.destroy({ where: { id: userId } });
        res.status(200).json({ message: `User with id ${userId} has been deleted` });
      }
      if (role === "borrower") {
        const result = await Borrower.destroy({ where: { id: userId } });
        res.status(200).json({ message: `User with id ${userId} has been deleted` });
      }
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}

module.exports = UserController;

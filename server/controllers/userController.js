const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const sendMail = require("../helpers/NodeMailer");


class UserController {
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
      if(result){
        sendMail(result.email)
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({ where: { email } });
      const correctPassword = comparePassword(password, result.password);
      if (correctPassword) {
        const { id, firstName, lastName } = result;
        const token = generateToken(result);
        res.status(200).json({ access_token: token, id, firstName, lastName });
      } else {
        res.status(404).json({ message: "salah password" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;

const { Borrower, Loan } = require("../models/index");
const nodemailer = require("nodemailer");

class ScheduleController {
  static async ageLoan() {
    try {
      const result = await Loan.findAll({ where: { status: "borrowed" } });
      if (result.length !== 0) {
        result.forEach(async (data) => {
          if (data.dataValues.timeRemaining - 1 === 0) {
            const tenor = data.dataValues.timeRemaining - 1;
            const status = "deadline";
            await Loan.update(
              { timeRemaining, status },
              { where: { externalID: data.dataValues.externalID } }
            );

            const borrowerData = await Borrower.findOne({ where: { id: data.borrowerID } });
            const email = borrowerData.email;

            const smptTransport = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: "pinjamkuproject@gmail.com",
                pass: "Na1robi!",
              },
            });

            let sendResult = await smptTransport.sendMail({
              from: "pinjamkuproject@gmail.com",
              to: email,
              subject: "Your loan is past it's deadline",
              text: `please pay now or die`,
            });
          } else {
            const timeRemaining = data.dataValues.timeRemaining - 1;
            const status = "borrowed";
            await Loan.update(
              { timeRemaining, status },
              { where: { externalID: data.dataValues.externalID } }
            );
          }
        });
        res.status(200).json("done aging");
      } else {
        res.status(200).json("done with nothing to age");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ScheduleController;

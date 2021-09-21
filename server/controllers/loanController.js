const { Loan, Borrower, Lender } = require("../models/index");
const { XenditInvoice, XenditDisbursement } = require("../helpers/Xendit");

class LoanController {
  static async GetAll(req, res, next) {
    const { status } = req.query;
    const queries = {};
    try {
      if (status) {
        queries.status = status;
      }
      const result = await Loan.findAll({ where: queries, include: [Borrower, Lender] });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async GetByID(req, res, next) {
    const loanID = req.params.loanID;
    try {
      const result = await Loan.findOne({ where: { id: loanID }, include: [Borrower, Lender] });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async GetLenderLoan(req, res, next) {
    const lenderID = +req.user.id;
    // const lenderID = 1;
    try {
      const result = await Loan.findAll({ where: {lenderID: lenderID},include: [Borrower, Lender]});
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async GetBorrowerLoan(req, res, next) {
    const borrowerID = +req.user.id;
    // const borrowerID = 1;
    try {
      const result = await Loan.findAll({ where: {borrowerID}, include: [Borrower, Lender]});
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async CreateInvoiceLender(req, res, next) {
    const { id: lenderID, email } = req.user; //tunggu auth
    // const lenderID = 1;
    // const email = "dharmasatrya10@gmail.com";
    const { amount, tenor } = req.body;
    const randomID = Math.random().toString(36).slice(2);
    try {
      const loanData = {
        externalID: randomID,
        lenderID: lenderID,
        borrowerID: null,
        status: "pending",
        initialLoan: amount,
        tenor: tenor,
      };

      const createLoan = await Loan.create(loanData);

      const invoice = await XenditInvoice.createInvoice({
        externalID: `invoice-lender-${randomID}`,
        payerEmail: email,
        description: `Invoice for loan ${randomID}`,
        amount: amount,
        shouldSendEmail: true,
      });
      res.status(200).json({
        externalID: invoice.external_id,
        invoiceURL: invoice.invoice_url,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async CreateInvoiceBorrower(req, res, next) {
    const { email } = req.user;
    // const email = "dharmasatrya10@gmail.com";
    const { loanID } = req.body;
    try {
      const loanData = await Loan.findOne({ where: { id: loanID } });

      const amountWithInterest = loanData.initialLoan + loanData.initialLoan * 0.07;

      const invoice = await XenditInvoice.createInvoice({
        externalID: `invoice-borrower-${loanData.externalID}`,
        payerEmail: email,
        description: `Invoice for loan ${loanData.externalID}`,
        amount: amountWithInterest,
        shouldSendEmail: true,
      });
      res.status(200).json({
        externalID: invoice.external_id,
        invoiceURL: invoice.invoice_url,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async CreateWithdrawal(req, res, next) {
    //disburse ke lender
    const { lenderID } = req.body;

    try {
      const loan = {
        id: "123",
        initialLoan: 100000,
        lender: {
          bankCode: "BCA",
          accountHolderName: "Test",
          accountNumber: "1234567890",
        },
      };

      const withdrawalInterest = loan.initialLoan + loan.initialLoan * 0.05;

      const disbursement = await XenditDisbursement.create({
        externalID: `disburse-${loan.id}`,
        bankCode: loan.lender.bankCode,
        accountHolderName: loan.lender.accountHolderName,
        accountNumber: loan.lender.accountNumber,
        description: `withdrawal for ${loan.id}`,
        amount: withdrawalInterest,
      });
      res.status(200).json(disbursement);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async CreateDisbursement(req, res, next) {
    //disburse ke borrower
    const { loanID } = req.body;
    // const borrowerID = req.userID
    const borrowerID = 1;
    try {
      const loanData = await Loan.findOne({ where: { id: loanID } });
      const borrowerData = await Borrower.findOne({ where: { id: borrowerID } });
      await Loan.update({ borrowerID: borrowerID }, { where: { id: loanID } });
      const amountWithInterest = loanData.initialLoan + loanData.initialLoan * 0.07;

      const loanDataInput = {
        externalID: `disburse-borrower-${loanData.externalID}`,
        bankCode: borrowerData.bankCode,
        accountHolderName: borrowerData.holderName,
        accountNumber: `${borrowerData.accountNumber}`,
        description: `loan disbursement for ${loanData.externalID}`,
        amount: amountWithInterest,
      };

      const disbursement = await XenditDisbursement.create(loanDataInput);
      res.status(200).json(disbursement);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async InvoiceEndpoint(req, res, next) {
    const { external_id, status, amount } = req.body;
    try {
      if (status === "FAILED") {
        res.status(200).json({ status: "failed" });
      } else if (status === "PAID") {
        if (external_id.includes("borrower")) {
          const loanID = external_id.split("-")[2];
          const loanData = await Loan.update(
            { status: "complete" },
            { where: { externalID: loanID } }
          );
          res.status(200).json({ status: "complete", id: loanID });
        } else {
          const loanID = external_id.split("-")[2];
          const loanData = await Loan.update(
            { status: "active" },
            { where: { externalID: loanID }, returning: true }
          );
          res.status(200).json({ status: "active", id: loanID });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async DisbursementEndpoint(req, res, next) {
    const { external_id, status } = req.body;
    try {
      if (status === "FAILED") {
        res.status(200).json({ status: "failed" });
      } else if (status === "COMPLETED") {
        if (external_id.includes("borrower")) {
          const loanID = external_id.split("-")[2];
          const loanData = await Loan.update(
            { status: "borrowed" },
            { where: { externalID: loanID } }
          );
          res.status(200).json({ status: "borrower", id: loanID });
        } else {
          const loanID = external_id.split("-")[2];
          const loanData = await Loan.update(
            { status: "withdrawn" },
            { where: { externalID: loanID } }
          );
          res.status(200).json({ status: "lender", id: loanID });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = LoanController;

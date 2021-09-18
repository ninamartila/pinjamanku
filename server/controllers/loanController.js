const { User, Loan } = require("../models");
const { XenditInvoice, XenditDisbursement } = require('../helpers/Xendit');
const loan = require("../models/loan");

class LoanController {
	static async CreateInvoiceLender(req, res, next) {
		const { userID, email } = req.user.email;
		const {amount, tenor} = req.body
		const randomID = Math.random().toString(36).slice(2)
		try {
			const loanData = {
				externalID: randomID,
				UserId: userID,
				initialLoan: amount,
				status: "pending",
				amountPaid: 500000,
				tenor: tenor
			}

			const createLoan = await Loan.create(loanData)

			const invoice = await XenditInvoice.createInvoice({
				externalID: `invoice-lender-${randomID}`,
				payerEmail: email,
				description: `Invoice for loan ${randomID}`,
				amount: amount,
				shouldSendEmail: true
			});
			res.status(200).json({
				externalID: invoice.external_id,
				invoiceURL: invoice.invoice_url
			});
		} catch (error) {
			console.log(error);
		}
	}

	static async CreateInvoiceBorrower(req, res, next) {
		const {email} = req.user.email
		const { loanID } = req.body;
		try {
			const loanData = await Loan.findOne({where: {id: loanID}})

			const amountWithInterest = loanData.initialLoan * 0.07

			const invoice = await XenditInvoice.createInvoice({
				externalID: `invoice-borrower-${loanData.externalID}`,
				payerEmail: email,
				description: `Invoice for loan ${loanData.externalID}`,
				amount: amountWithInterest,
				shouldSendEmail: true
			});
			res.status(200).json({
				externalID: invoice.external_id,
				invoiceURL: invoice.invoice_url
			});
		} catch (error) {
			console.log(error);
		}
	}

	static async CreateWithdrawal(req, res, next) { //disburse ke lender
		const {lenderID} = req.body;

		try {
			const loan = {
				id: '123',
				initialLoan: 100000,
				lender: {
					bankCode: 'BCA',
					accountHolderName: 'Test',
					accountNumber: '1234567890'
				}
			};

			const withdrawalInterest = loan.initialLoan + loan.initialLoan * 0.05;

			const disbursement = await XenditDisbursement.create({
				externalID: `disburse-${loan.id}`,
				bankCode: loan.lender.bankCode,
				accountHolderName: loan.lender.accountHolderName,
				accountNumber: loan.lender.accountNumber,
				description: `withdrawal for ${loan.id}`,
				amount: withdrawalInterest
			});
			res.status(200).json(disbursement);
		} catch (error) {
			console.log(error);
		}
	}

	static async CreateDisbursement(req, res, next) { //disburse ke borrower
		const {loanID} = req.body;
		const borrowerID = req.userID
		try {
			const loan = await Loan.findOne({where: {id:loanID}})
			const userData = await User.findOne({where: {id: borrowerID}})

			const loanData = {
				externalID: `disburse-borrower-${loan.id}`,
				bankCode: userData.bankCode,
				accountHolderName: userData.holderName,
				accountNumber: userData.accountNumber,
				description: `loan disbursement for ${loan.id}`,
				amount: loan.initialLoan
			};

			const disbursement = await XenditDisbursement.create(loanData);
			res.status(200).json(disbursement);
		} catch (error) {
			console.log(error);
		}
	}

	static async InvoiceEndpoint(req, res, next) {
		const { external_id, status, amount } = req.body;
		try {
			if (status === 'FAILED') {
				res.status(200).json({ status: 'failed' });
			} else if (status === 'PAID') {
				if(external_id.includes("borrower")){
					const loanID = external_id.slice(-11)
					const loanData = await Loan.update({status: "complete"}, {where: {external_id: loanID}})
					res.status(200).json({ status: 'complete', id: loanID });
				} else {
					const loanID = external_id.slice(-11)
					const loanData = await Loan.update({status: "active"}, {where: {external_id: loanID}})
					res.status(200).json({ status: 'active', id: loanID });
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async DisbursementEndpoint(req, res, next) {
		const { external_id, status } = req.body;
		try {
			if (status === 'FAILED') {
				res.status(200).json({ status: 'failed' });
			} else if (status === 'PAID') {
				if(external_id.includes("borrower")){
					const loanID = external_id.slice(-11)
					const loanData = await Loan.update({status: "borrowed"}, {where: {external_id: loanID}})
					res.status(200).json({ status: 'borrower', id: loanID });
				} else {
					const loanID = external_id.slice(-11)
					const loanData = await Loan.update({status: "withdrawn"}, {where: {external_id: loanID}})
					res.status(200).json({ status: 'lender', id: loanID });
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	static Test(req, res, next) {
		try {
			res.status(200).json({ msg: 'ok' });
		} catch (error) {
			res.status(500);
		}
	}
}

module.exports = LoanController;

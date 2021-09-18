// const {} = require("")
const { XenditInvoice, XenditDisbursement } = require('../helpers/Xendit');

class LoanController {
	static async CreateInvoice(req, res, next) {
		const { email } = req.body;
		const loanID = '123456';
		try {
			const invoice = await XenditInvoice.createInvoice({
				externalID: 'EXTERNAL_ID_KITA',
				payerEmail: 'pinjamkuproject@gmail.com',
				description: `Invoice for loan ${loanID}`,
				amount: 100000,
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

	// static async CreateLoan(req, res, next) {
	// 	const {} = req.body;
	// 	try {
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	static async CreateWithdrawal(req, res, next) {
		const {} = req.body;

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

	static async CreateDisbursement(req, res, next) {
		const {} = req.body;
		try {
			const loan = {
				id: '123',
				initialLoan: 100000,
				borrower: {
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

	static async InvoiceEndpoint(req, res, next) {
		const { external_id, status } = req.body;
		try {
			if (status === 'FAILED') {
				res.status(200).json({ status: 'failed' });
			} else if (status === 'PAID') {
				res.status(200).json({ status: 'paid' });
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
			} else if (status === 'COMPLETED') {
				res.status(200).json({ status: 'paid' });
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

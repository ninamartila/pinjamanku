const router = require("express").Router();
const LoanController = require("../controllers/loanController");

router.post("/invoice/borrower", LoanController.CreateInvoiceBorrower);
router.post("/invoice/lender", LoanController.CreateInvoiceLender);
router.post("/disburse/withdrawal", LoanController.CreateWithdrawal);
router.post("/disburse/loan", LoanController.CreateDisbursement);
router.post("/endpoint/invoice", LoanController.InvoiceEndpoint);
router.post("/endpoint/disbursement", LoanController.DisbursementEndpoint);

module.exports = router;

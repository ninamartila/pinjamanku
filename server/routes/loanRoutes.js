const router = require("express").Router();
const LoanController = require("../controllers/loanController");
const authentication = require("../middlewares/authentication");

router.get("/", LoanController.GetAll);

router.use(authentication);

router.get("/lender", LoanController.GetLenderLoan);
router.get("/borrower", LoanController.GetBorrowerLoan);
router.get("/:loanID", LoanController.GetByID);
router.post("/invoice/borrower", LoanController.CreateInvoiceBorrower);
router.post("/invoice/lender", LoanController.CreateInvoiceLender);
router.post("/disburse/withdrawal", LoanController.CreateWithdrawal);
router.post("/disburse/loan", LoanController.CreateDisbursement);
router.post("/endpoint/invoice", LoanController.InvoiceEndpoint);
router.post("/endpoint/disbursement", LoanController.DisbursementEndpoint);

module.exports = router;

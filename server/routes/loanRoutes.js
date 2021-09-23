const router = require("express").Router();
const LoanController = require("../controllers/loanController");

const authentication = require("../middlewares/authentication");
const { isLender, isBorrower } = require("../middlewares/authorization");

router.get("/", LoanController.GetAll);
router.post("/endpoint/invoice", LoanController.InvoiceEndpoint);
router.post("/endpoint/disbursement", LoanController.DisbursementEndpoint);

router.use(authentication);

router.get("/lender", isLender, LoanController.GetLenderLoan);
router.get("/borrower", isBorrower, LoanController.GetBorrowerLoan);
router.get("/:loanID", LoanController.GetByID);
router.post("/invoice/borrower", LoanController.CreateInvoiceBorrower);
router.post("/invoice/lender", LoanController.CreateInvoiceLender);
router.post("/disburse/withdrawal", LoanController.CreateWithdrawal);
router.post("/disburse/loan", LoanController.CreateDisbursement);

module.exports = router;

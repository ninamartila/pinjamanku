const router = require('express').Router();
const LoanController = require("../controllers/LoanController")

router.get("/test", LoanController.Test)
router.post("/invoice", LoanController.CreateInvoice)
router.post("/disburse", LoanController.CreateDisbursement)
router.post("/endpoint/invoice", LoanController.InvoiceEndpoint)
router.post("/endpoint/disbursement", LoanController.DisbursementEndpoint)

module.exports = router
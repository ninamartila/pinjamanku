const router = require("express").Router();
const Controller = require("../controllers/LoanController");

router.get("/test", Controller.Test);
router.post("/invoice", Controller.CreateInvoice);
router.post("/disburse", Controller.CreateDisbursement);
router.post("/endpoint/invoice", Controller.InvoiceEndpoint);
router.post("/endpoint/disbursement", Controller.DisbursementEndpoint);

module.exports = router;

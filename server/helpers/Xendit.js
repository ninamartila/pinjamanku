const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.SECRET_KEY_XENDIT,
});
const { Invoice, Disbursement } = x;
const invoiceSpecificOptions = {};
const disbursementSpecificOptions = {};
const XenditInvoice = new Invoice(invoiceSpecificOptions);
const XenditDisbursement = new Disbursement(disbursementSpecificOptions);

module.exports = { XenditInvoice, XenditDisbursement };

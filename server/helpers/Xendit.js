const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey: 'xnd_development_S1YRENVA6FA1ELZerCvKR3NaBY1J7Jm2JLLhawkAzF7R5gTg4SvcAZfaXPIKA0n',
});
const { Invoice, Disbursement } = x;
const invoiceSpecificOptions = {};
const disbursementSpecificOptions = {};
const XenditInvoice = new Invoice(invoiceSpecificOptions);
const XenditDisbursement = new Disbursement(disbursementSpecificOptions);


module.exports = {XenditInvoice, XenditDisbursement}
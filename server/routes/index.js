const errorHandle = require('../middleware/errorHandler');
const routerBorrower = require('./routerBorrower');
const router = require('express').Router();

router.use('/borrowers', routerBorrower)
router.use(errorHandle)

module.exports = router
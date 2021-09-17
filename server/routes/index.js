const router = require('express').Router();
const loanRouter = require("./loanRouter")

router.use("/loan", loanRouter)

module.exports = router
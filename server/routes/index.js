const router = require("express").Router();
const loanRoutes = require("./loanRoutes");

router.use("/loans", loanRoutes);

module.exports = router;

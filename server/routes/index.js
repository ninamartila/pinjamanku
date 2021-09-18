const router = require("express").Router();
const userRoutes = require("./userRoutes");
const loanRoutes = require("./loanRoutes");

router.use("/users", userRoutes);

router.use("/loans", loanRoutes);

module.exports = router;

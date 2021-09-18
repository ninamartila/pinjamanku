const router = require("express").Router();
const Controller = require("../controllers/userController");

router.post("/register", Controller.registerUser);

router.post("/login", Controller.loginUser);

module.exports = router;

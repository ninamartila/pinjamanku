const router = require("express").Router();
const Controller = require("../controllers/userController");

router.get("/", Controller.getAll);
router.get("/:userId", Controller.userById);
router.post("/register", Controller.registerUser);
router.post("/login", Controller.loginUser);
router.patch("/", Controller.updateUser);
router.put("/:userId", Controller.updateUserStatus);
router.delete("/:userId", Controller.deleteUser);

module.exports = router;

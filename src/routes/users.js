const express = require("express");
const router = express.Router();
const { usersController } = require("../controller/users");
const { protect } = require("../middleware/auth");

router.post('/register', usersController.createUsers);
router.post("/login", usersController.login);
router.get('/detail',protect, usersController.findUserdetail);
router.get('/verif/:email/:otp',usersController.verif);

module.exports = router;
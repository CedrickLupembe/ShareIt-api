const express = require("express");
const router = express.Router();

// controllers functions
const { Register, Login } = require("../controllers/controller");

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;

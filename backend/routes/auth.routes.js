const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { getMe } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware.js");
const { getUserStats } = require("../controllers/user.controller.js");

router.get("/stats", verifyToken, getUserStats);
router.get("/me", verifyToken, getMe);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

module.exports = router;

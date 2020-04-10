const express = require('express');

const AuthController = require('../../controllers/auth');

const authenticateUser = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.delete('/delete', authenticateUser, AuthController.deleteUser);

module.exports = router;

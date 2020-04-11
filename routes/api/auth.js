const express = require('express');

const AuthController = require('../../controllers/auth');

const router = express.Router();

router.post('/login', AuthController.loginUser);
router.get('/validate', AuthController.validateToken);

module.exports = router;

const express = require('express');

const UserController = require('../../controllers/user.controller');
const authenticateUser = require('../../middlewares/authenticate-user');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.get('/info', authenticateUser, UserController.getInfo);
router.post('/edit', authenticateUser, UserController.editUser);

module.exports = router;

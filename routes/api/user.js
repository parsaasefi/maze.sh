const express = require('express');

const UserController = require('../../controllers/user');
const authenticateUser = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.delete('/delete', authenticateUser, UserController.deleteUser);
router.patch('/update', authenticateUser, UserController.updateUser);

module.exports = router;

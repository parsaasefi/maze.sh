const express = require('express');

const UserController = require('../../controllers/user.controller');
const authenticateUser = require('../../middlewares/authenticate-user');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.get('/info', authenticateUser, UserController.getInfo);
router.patch('/edit', authenticateUser, UserController.editUser);
router.patch('/key', authenticateUser, UserController.regenerateAPIKey);
router.delete('/delete', authenticateUser, UserController.deleteAccount);
router.patch('/password', authenticateUser, UserController.changePassword);

module.exports = router;

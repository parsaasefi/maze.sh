const express = require('express');

const UserController = require('../../controllers/user');
const authenticateUser = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticateUser, UserController.getUserData);
router.post('/register', UserController.registerUser);
router.delete('/delete', authenticateUser, UserController.deleteUser);
router.patch('/update', authenticateUser, UserController.updateUser);
router.patch('/password', authenticateUser, UserController.changePassword);
router.get('/links', authenticateUser, UserController.getLinks);

module.exports = router;

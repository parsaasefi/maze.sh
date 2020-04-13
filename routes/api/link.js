const express = require('express');

const LinkController = require('../../controllers/link');
const checkAuth = require('../../middlewares/check-auth');
const authenticateUser = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/', checkAuth, LinkController.createLink);
router.get('/:page?', authenticateUser, LinkController.getUserLinks);

module.exports = router;

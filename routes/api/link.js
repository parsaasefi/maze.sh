const express = require('express');

const LinkController = require('../../controllers/link');
const checkAuth = require('../../middlewares/check-auth');

const router = express.Router();

router.post('/create', checkAuth, LinkController.createLink);

module.exports = router;

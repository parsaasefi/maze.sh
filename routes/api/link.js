const express = require('express');

const LinkController = require('../../controllers/link');

const router = express.Router();

router.post('/', LinkController.createLink);

module.exports = router;

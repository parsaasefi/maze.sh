const express = require('express');

const LinkController = require('../../controllers/link.controller');

const router = express.Router();

router.post('/shorten', LinkController.shortenLink);

module.exports = router;

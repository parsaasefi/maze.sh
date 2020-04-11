const express = require('express');

const authRoute = require('./auth');
const userRoute = require('./user');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);

module.exports = router;

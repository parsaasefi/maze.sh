const express = require('express');

const authRoute = require('./auth');
const userRoute = require('./user');
const linkRoute = require('./link');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/link', linkRoute);

module.exports = router;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRoute = require('./routes/api');

const mongoConfig = require('./config/mongo');

const app = express();

mongoose
  .connect(mongoConfig.uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRoute);

module.exports = app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoConfig = require('./config/mongo');
const Router = require('./routes');

const app = express();

mongoose
  .connect(mongoConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    throw err;
  });

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

Router.registerRoutes(app);

module.exports = app;

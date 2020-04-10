const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Mazed.');
});

module.exports = app;

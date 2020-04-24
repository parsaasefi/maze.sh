const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Maze');
});

module.exports = app;

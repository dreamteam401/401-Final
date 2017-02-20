const express = require('express');
const app = express();

const lists = require('./routes/lists-route');

// logging:
const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));


app.use('/lists', lists);


module.exports = app;
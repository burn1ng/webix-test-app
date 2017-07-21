// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const appExpress            = express();
const port = 8000;

appExpress.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(appExpress, {});

appExpress.listen(port, () => {
  console.log('We are live on ' + port);
});
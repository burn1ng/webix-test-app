// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const appExpress     = express();
const port           = 8000;

appExpress.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  require('./routes')(appExpress, database);

  appExpress.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
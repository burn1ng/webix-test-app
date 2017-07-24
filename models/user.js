const mongoose = require('mongoose');
const db = require('../config/db');
var promise = mongoose.createConnection(db.url, { useMongoClient: true });


// promise.then(function(db) {
  
// });

module.exports = mongoose.model('User', {
    id: String,
    username: String,
    password: String,
    email: String
});
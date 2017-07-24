// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const db = require('./config/db');

const appExpress = express();
const port = 8000;


// appExpress.set('views', './views');
// appExpress.engine('html', require('ejs').renderFile);

// Configuring Passport
const passport = require('passport');
const expressSession = require('express-session');
appExpress.use(expressSession({
    secret: 'mySecretCookie_secret',
    resave: true,
    saveUninitialized: true

}));
appExpress.use(passport.initialize());
appExpress.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
appExpress.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/passport_routes')(appExpress, db, passport);
appExpress.use('/', routes);

/// catch 404 and forward to error handler
appExpress.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




// static server
appExpress.use(express.static('./'));

//Express can't process <forms> in URL-encoding, that's why we are using body-parser
appExpress.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    require('./routes')(appExpress, database, passport);

    appExpress.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
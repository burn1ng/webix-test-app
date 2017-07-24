const noteRoutes = require('./note_routes');
const passportRoutes = require('./passport_routes');

module.exports = function(appExpress, db, passport) {
  noteRoutes(appExpress, db);
  // here will be other route handlers
  passportRoutes(appExpress, db, passport);
};
const noteRoutes = require('./note_routes');

module.exports = function(appExpress, db) {
  noteRoutes(appExpress, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};
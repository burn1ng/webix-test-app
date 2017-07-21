module.exports = function(appExpress, db) {
    appExpress.post('/notes', (req, res) => {
        // Здесь будем создавать заметку.
        console.log(req.body)
        res.send('Hello')
    });
};
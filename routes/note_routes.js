var ObjectID = require('mongodb').ObjectID;

module.exports = function(appExpress, db) {

    // CREATE route
    appExpress.post('/notes', (req, res) => {

        const note = { text: req.body.body, title: req.body.title };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });

        // console.log(req.body)
        // res.send('Hello')
    });

    // READ route
    appExpress.get('/notes/:id', (req, res) => {

        const id = req.params.id;
        //MongoDB require ID not as String, but in sprecial [ObjectID] object
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    // UPDATE route (PUT = read + create logic)
    appExpress.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });


    // DELETE route
    appExpress.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });


};
var ObjectID = require('mongodb').ObjectID;

module.exports = function(appExpress, db) {

    // CREATE route
    appExpress.post('/new-note', (req, res) => {

        const note = { text: req.body.text, title: req.body.title };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
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

    //READ route for all notes
    appExpress.get('/get-notes', (req, res) => {
        //const id = req.params.id;

        var cursor = db.collection('notes').find().toArray(function(err, docs) {
            res.send(docs);
        });
    });

    // UPDATE route (PUT = read + create logic) for 1 exact note
    // appExpress.put('/update-note/:id', (req, res) => {
    //     const id = req.params.id;
    //     const details = { '_id': new ObjectID(id) };
    //     const note = { text: req.body.body, title: req.body.title };

    //     db.collection('notes').update(details, note, (err, result) => {
    //         if (err) {
    //             res.send({ 'error': 'An error has occurred' });
    //         } else {
    //             res.send(note);
    //         }
    //     });
    // });
    appExpress.put('/update-note/:id', (req, res) => {

        const bd_id = req.body._id;
        
        const details = { '_id': new ObjectID(bd_id) };
        const note = { text: req.body.text, title: req.body.title };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });

    // DELETE route
    appExpress.delete('/delete-note/:id', (req, res) => {
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
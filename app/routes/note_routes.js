var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  const collection = db.collection('notes');

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id)};
    collection.findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred.' });
      } else {
        res.status(200).send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = {
      title: req.body.title,
      text: req.body.body
    };

    collection.insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred.' });
      } else {
        res.status(201).send(result.ops[0]);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    collection.update(details, note, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred.'
        });
      } else {
        res.status(200).send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id)};
    collection.remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred.' });
      } else {
        res.status(202).send({
          "message": "Note " + id + " has been deleted."
        });
      }
    });
  });
};

module.exports = (app, db) => {
  const collection = db.collection('notes');

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
};

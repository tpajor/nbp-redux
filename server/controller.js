const Card = require('./card');


exports.addCard = function(req, res) {
  const newCard = new Card(req.body);
  newCard.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
};
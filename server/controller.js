const Card = require('./card');
const User = require('./user');

exports.addCard = function(req, res) {
  const newCard = new Card(req.body.card);
  User.findOne({ userName: req.body.userName }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    newCard.save().then(() => {
      user.cards.push(newCard);
      user.save().then(() => {
        res.status(200).end();
      });
    });
  });
};

exports.deleteCard = function(req, res) {
  User.findOne({ userName: req.body.userName }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    Card.findOne({ id: req.body.cardId }).then(card => {
      user.cards.pull(card);
      user.save().then(() => {
        card.remove().then(() => {
          res.status(200).end();
        });
      })
    });
  });
};

exports.addUser = function(req, res) {
  const newUser = new User(req.body);
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
};

exports.getUsers = function(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
};
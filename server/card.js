const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  id: String,
  code: String,
  rates: [],
  currency: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
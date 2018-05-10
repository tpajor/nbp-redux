const Router = require('express');
const addCard = require('./controller').addCard;

const router = new Router();

router.route('/card').post(addCard)

module.exports = router;
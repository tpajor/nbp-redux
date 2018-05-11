const Router = require('express');
const addCard = require('./controller').addCard;
const deleteCard = require('./controller').deleteCard;
const addUser = require('./controller').addUser;
const getUsers = require('./controller').getUsers;

const router = new Router();

router.route('/card').post(addCard);

router.route('/card').delete(deleteCard);

router.route('/user').post(addUser);

router.route('/user').get(getUsers);

module.exports = router;
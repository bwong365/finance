const router = require('express').Router();

const buyStock = require('./helpers/stock/buyStock');
const getQuote = require('./helpers/stock/getQuote');
const sendQuote = require('./helpers/stock/sendQuote');
const getBalance = require('./helpers/stock/getBalance');

const hashpw = require('./helpers/validation/hashpw');
const register = require('./helpers/validation/register');
const signToken = require('./helpers/validation/signToken');
const validateToken = require('./helpers/validation/validateToken');
const validateLoginPassword = require('./helpers/validation/validateLoginPassword');


router.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

// Registration
router.route('/register').post(hashpw, register);

// Login
router.route('/login').post(validateLoginPassword, signToken);
// change password

// Get stock prices
router.route('/quote/:symbol').get(validateToken, getQuote, sendQuote);

// Buy stocks
router.route('/buy').post(validateToken, getQuote, getBalance, buyStock);

// get stock quotes
// sell stocks
module.exports = router;
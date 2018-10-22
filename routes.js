const router = require('express').Router();

// Stock helpers
const addTransaction       = require('./helpers/stock/addTransaction');
const buyStock             = require('./helpers/stock/buyStock');
const getBalance           = require('./helpers/stock/getBalance');
const getShareInfo         = require('./helpers/stock/getShareInfo');
const getQuote             = require('./helpers/stock/getQuote');
const requireEnoughShares  = require('./helpers/stock/requireEnoughShares');
const sellStock            = require('./helpers/stock/sellStock');
const sendQuote            = require('./helpers/stock/sendQuote');
const validateShareRequest = require('./helpers/stock/validateShareRequest');

// Validation helpers
const confirmToken          = require('./helpers/validation/confirmToken');
const hashpw                = require('./helpers/validation/hashpw');
const register              = require('./helpers/validation/register');
const signToken             = require('./helpers/validation/signToken');
const validateLoginPassword = require('./helpers/validation/validateLoginPassword');
const validateToken         = require('./helpers/validation/validateToken');

module.exports = router;

// Token verification
router.route('/auth')
  .post(validateToken, confirmToken);

// Registration
router.route('/register')
  .post(hashpw, register, signToken);

// Login
router.route('/login')
  .post(validateLoginPassword, signToken);

// Protected Routes Below
router.use(validateToken);

// Home
router.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

// Keep getQuote in individual chains, to read params

// Get stock price
router.route('/quote/:symbol')
.get(getQuote, sendQuote);

// Buy stock
router.route('/buy')
  .post(
    validateShareRequest,
    getQuote,
    getBalance,
    buyStock,
    addTransaction
  );

// Sell stock
router.route('/sell')
  .post(
    validateShareRequest,
    getShareInfo,
    requireEnoughShares,
    getQuote,
    getBalance,
    sellStock,
    addTransaction
  );

// change password
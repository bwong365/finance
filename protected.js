const protected = require('express').Router();

// Stock helpers
const addTransaction       = require('./helpers/stock/addTransaction');
const buyStock             = require('./helpers/stock/buyStock');
const getBalance           = require('./helpers/stock/getBalance');
const getShareInfo         = require('./helpers/stock/getShareInfo');
const aggregateShares      = require('./helpers/stock/aggregateShares');
const getAllSharePrices    = require('./helpers/stock/getAllSharePrices');
const getAllTransactions   = require('./helpers/stock/getAllTransactions');
const getQuote             = require('./helpers/stock/getQuote');
const requireEnoughShares  = require('./helpers/stock/requireEnoughShares');
const sellStock            = require('./helpers/stock/sellStock');
const sendQuote            = require('./helpers/stock/sendQuote');
const validateShareRequest = require('./helpers/stock/validateShareRequest');

// Validation helpers
const validateToken = require('./helpers/validation/validateToken');

module.exports = protected;

protected.use(validateToken);

// Home
protected.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

// Keep getQuote in individual chains, to read params

protected.route('/profile')
  .get(getBalance, getAllTransactions, aggregateShares, getAllSharePrices)

// Get stock price
protected.route('/quote/:symbol')
  .get(getQuote, sendQuote);

// Buy stock
protected.route('/buy')
  .post(validateShareRequest, getQuote, getBalance, buyStock, addTransaction);

// Sell stock
protected.route('/sell')
  .post(validateShareRequest, getShareInfo, requireEnoughShares, getQuote, getBalance, sellStock, addTransaction);

// change password
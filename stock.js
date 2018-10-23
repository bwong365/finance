const stock = require('express').Router();

// Stock helpers
const getAllSharePrices    = require('./helpers/stock/api/getAllSharePrices');
const getQuote             = require('./helpers/stock/api/getQuote');

const addTransaction       = require('./helpers/stock/db/addTransaction');
const getAllTransactions   = require('./helpers/stock/db/getAllTransactions');
const getBalance           = require('./helpers/stock/db/getBalance');
const getShareInfo         = require('./helpers/stock/db/getShareInfo');

const aggregateShares      = require('./helpers/stock/aggregateShares');
const buyStock             = require('./helpers/stock/buyStock');
const getShareAmounts      = require('./helpers/stock/getShareAmounts');
const requireEnoughShares  = require('./helpers/stock/requireEnoughShares');
const sellStock            = require('./helpers/stock/sellStock');
const sendQuote            = require('./helpers/stock/sendQuote');
const validateShareRequest = require('./helpers/stock/validateShareRequest');

// Validation helpers
const validateToken = require('./helpers/validation/validateToken');

// All routes are protected
stock.use(validateToken);

// Keep getQuote in individual chains, to read params

// Get all stock
stock.route('/portfolio')
  .get(getBalance, getAllTransactions, aggregateShares, getAllSharePrices)

// Get stock amounts
stock.route('/amounts')
  .get(getAllTransactions, aggregateShares, getShareAmounts)

// Get stock price
stock.route('/quote/:symbol')
  .get(getQuote, sendQuote);
stock.route('/buy').post(validateShareRequest, getQuote, getBalance, buyStock, addTransaction);
stock.route('/sell').post(validateShareRequest, getShareInfo, requireEnoughShares, getQuote, getBalance, sellStock, addTransaction);

// change password

module.exports = stock;
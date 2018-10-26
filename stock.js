const stock = require('express').Router();

// Api middleware
const getQuote      = require('./helpers/stock/api/getQuote');
const searchStock   = require('./helpers/stock/api/searchStock');
const sendPortfolio = require('./helpers/stock/api/sendPortfolio');

// Database middleware
const addTransaction     = require('./helpers/stock/db/addTransaction');
const getAllTransactions = require('./helpers/stock/db/getAllTransactions');
const getBalance         = require('./helpers/stock/db/getBalance');
const getShareInfo       = require('./helpers/stock/db/getShareInfo');

// Stock processing middleware
const aggregateShares      = require('./helpers/stock/aggregateShares');
const buyStock             = require('./helpers/stock/buyStock');
const getShareAmounts      = require('./helpers/stock/getShareAmounts');
const requireEnoughShares  = require('./helpers/stock/requireEnoughShares');
const returnSearch         = require('./helpers/stock/returnSearch');
const sellStock            = require('./helpers/stock/sellStock');
const validateShareRequest = require('./helpers/stock/validateShareRequest');

// Validation helpers
const validateToken = require('./helpers/validation/validateToken');

// All routes are protected
stock.use(validateToken);

// Search for stock info from keywords
stock.route('/search')
  .get(searchStock, getQuote, returnSearch);

// Get comprehensive stock portfolio
stock.route('/portfolio')
  .get(getBalance, getAllTransactions, aggregateShares, sendPortfolio);

// Get stock amounts
stock.route('/amounts')
  .get(getAllTransactions, aggregateShares, getShareAmounts);

// Buy stock
stock.route('/buy')
  .post(validateShareRequest, getQuote, getBalance, buyStock, addTransaction);

// Sell stock
stock.route('/sell')
  .post(validateShareRequest, getShareInfo, requireEnoughShares, getQuote, getBalance, sellStock, addTransaction);

module.exports = stock;
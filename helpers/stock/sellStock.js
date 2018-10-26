const monetize = require('../util/monetize');

/**
 * Calculate new balance and (negative) shares for a sale
 * attach as req.newBalance and req.shares
 */
module.exports = function sellStock(req, _, next) {
  const { balance } = req;
  const { shares }  = req.body;
  const { price }   = req.quote;

  // Calculate total sale price
  const totalSale = monetize(shares * price);
  
  // Calculate the new balance
  const newBalance = monetize(balance + totalSale);
  req.newBalance = newBalance;

  // Attach shares as a negative amount for transaction
  req.shares = -shares;
  next();
}
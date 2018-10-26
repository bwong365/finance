const monetize = require('../util/monetize');

/**
 * Check to ensure adequate balance for purchase. If valid,
 * attach new Balance and share amount to the request
 */
module.exports = function buyStock(req, res, next) {
  const { balance } = req;
  const { shares }  = req.body;
  const { price }   = req.quote;
  
  // Calculate total purchase price
  const total = monetize(price * shares);

  // Verify an adequate balance
  if (total > balance) return res.json({ Error: 'not enough money!' });

  // Determine the new balance and attach info to the request
  const newBalance = monetize(balance - total);
  req.newBalance = newBalance;
  req.shares = shares;
  next();
}  
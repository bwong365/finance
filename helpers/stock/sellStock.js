const monetize = require('../util/monetize');

module.exports = function sellStock(req, _, next) {
  const { balance } = req;
  const { shares }  = req.body;
  const { price }   = req.quote

  const totalSale = monetize(shares * price);
  const newBalance = monetize(balance + totalSale);
  
  req.newBalance = newBalance;
  req.shares = -shares;
  next();
}
const monetize = require('../monetize');

module.exports = function buyStock(req, res, next) {
  const { balance } = req;
  const { shares }  = req.body;
  const { price }   = req.quote
  
  const total = monetize(price * shares);
  if (total > balance) return res.json({details: 'not enough money!'});
  
  // how much will be left over?
  const newBalance = monetize(balance - total);
  req.newBalance = newBalance;
  req.shares = shares;
  next();
}  
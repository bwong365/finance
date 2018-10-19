const dbQuery = require('../queryPG');
const monetize = require('../monetize');

module.exports = async function buyStock(req, res) {
  const price = req.body.quote.price;
  const shares = req.body.shares;
  const total = monetize(price * shares);
  
  if (total > req.balance) {
    res.json({details: 'not enough money!'});
    return;
  }
  
  
}
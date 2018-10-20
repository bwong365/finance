const dbQuery = require('../queryPG');
const monetize = require('../monetize');

module.exports = async function buyStock(req, res) {
  const price = req.quote.price;
  const shares = req.body.shares;
  const total = monetize(price * shares);
  
  if (total > req.balance) {
    res.json({details: 'not enough money!'});
    return;
  }
  
  // how much will be left over?
  const newBalance = req.balance - total;

  const queryUpdate = {
    text: 'UPDATE users SET balance = $1 WHERE username = $2',
    values: [newBalance, req.user]
  }
          
  const queryInsert = {
    text: 'INSERT INTO transactions (username, symbol, price, amount) VALUES ($1, $2, $3, $4)',
    values: [req.user, req.quote.symbol, price, shares]
  }

  try {
    const updated = dbQuery(queryUpdate);
    const inserted = dbQuery(queryInsert);
    const done = await updated && await inserted;
    res.send({message: 'Success!'});
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}
const db = require('../queryPG');

module.exports = async function addTransaction(req, res) {
  const { username, newBalance, shares } = req;
  const { symbol, price } = req.quote

  const updateBalance = {
    text: 'UPDATE users SET balance = $1 WHERE username = $2',
    values: [newBalance, username]
  }
          
  const addTransaction = {
    text: 'INSERT INTO transactions (username, symbol, price, amount) VALUES ($1, $2, $3, $4)',
    values: [username, symbol, price, shares]
  }

  try {
    // Call parallel queries
    const updated = db(updateBalance);
    const inserted = db(addTransaction);

    // Await, but leave parallel
    const done = await updated && await inserted;
    res.send({message: 'Success!'});
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

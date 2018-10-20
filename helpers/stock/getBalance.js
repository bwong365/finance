const dbQuery = require('../queryPG');

/**
 * Middleware
 * Attach the user's cash-on-hand to the request as req.balance
 */
module.exports = async function getBalance(req, res, next) {
  const query = {
    text: 'SELECT balance::NUMERIC FROM users WHERE username = $1',
    values: [req.user]
  }

  try {
    const dbData = await dbQuery(query);
    req.balance = dbData.rows[0].balance;
    next();
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}


/**
 * Middleware
 * Attach the user's cash-on-hand to the request as req.balance
 */
module.exports = async function getBalance(req, res, next) {
  const query = {
    text: 'SELECT balance::NUMERIC FROM users WHERE username = $1',
    values: [req.username]
  }

  try {
    const dbData = await db.query(query);
    req.balance = Number(dbData.rows[0].balance);
    next();
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}


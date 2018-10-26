/**
 * Get a record of user's transaction history from the database
 * attack record to the request as req.transactions
 */
module.exports = function getAllTransactions(req, res, next) {
    const query = {
    text: 'SELECT * FROM transactions WHERE username = $1',
    values: [req.username]
  };

  db.query(query)
    .then(dbData => {
      req.transactions = dbData.rows;
      next();
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    });
}
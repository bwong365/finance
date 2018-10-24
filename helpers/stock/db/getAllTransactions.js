module.exports = function getAllTransactions(req, res, next) {
  // get all transactions
  // deal with the rows

  const query = {
    text: 'SELECT * FROM transactions WHERE username = $1',
    values: [req.username]
  }

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
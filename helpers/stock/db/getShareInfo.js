/**
 * Query database for transactions for a given user and stock symbol
 * attach info to the request as req.shareInfo
 */
module.exports = async function getShareInfo(req, res, next) {
  const query = {
    text: 'SELECT amount FROM transactions WHERE username = $1 AND symbol = $2',
    values: [req.username, req.body.symbol]
  };

  try {
    const dbData = await db.query(query);
    // Find the total shares owned of the stock
    const sharesOwned = dbData.rows.reduce((acc, row) => acc + row.amount, 0);

    // Attach the symbol and amount to the request
    req.shareInfo = {
      sharesOwned,
      symbol: req.body.symbol
    };
    next();
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

}
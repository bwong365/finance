const db = require('../queryPG');

module.exports = async function getShareInfo(req, res, next) {
  const query = {
    text: 'SELECT amount FROM transactions WHERE username = $1 AND symbol = $2',
    values: [req.username, req.body.symbol]
  }

  try {
    const dbData = await db(query);
    const sharesOwned = dbData.rows.reduce((acc, row) => acc + row.amount, 0);
    
    req.shareInfo = {
      sharesOwned,
      symbol: req.body.symbol
    }
    next();
  } catch (e) {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  
}
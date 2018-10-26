/**
 * @param transactions from user history
 * consolidates all amounts and 
 * @return list of shares owned per stock,
 * attached to the request as req.allShares
 */
module.exports = async function aggregateShares(req, _, next) {
  const { transactions } = req;
  const allShares = {};

  // Iterate through the transactions
  transactions.forEach(row => {
    const symbol = row.symbol;

    // The stock exists in the aggregate object, increase the amount
    if (symbol in allShares) {
      allShares[symbol].amount += row.amount;
    
    // The stock has not been encountered in the iteration yet, add a new property
    } else {
      allShares[symbol] = { amount: row.amount };
    }
  });

  // Attach aggregate object to request
  req.allShares = allShares;
  next();
}
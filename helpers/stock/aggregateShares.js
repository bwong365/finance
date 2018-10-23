module.exports = async function aggregateShares(req, _, next) {
  const { transactions } = req;
  // Combine individual transactions into shares
  const allShares = {};

  transactions.forEach(row => {
    const symbol = row.symbol;
    if (symbol in allShares) {
      allShares[symbol].amount += row.amount;
    } else {
      allShares[symbol] = {amount: row.amount};
    }
  });
  req.allShares = allShares;
  next();
}
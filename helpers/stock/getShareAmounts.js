/**
 * Remove non-positive shares from a list of allShares, and
 * @return an array of objects {symbol, amount} to the client
 */
module.exports = function getShareAmounts(req, res) {
  const { allShares } = req;

  const sharesArray = Object.keys(allShares)
    .filter(symbol => allShares[symbol].amount > 0)
    .map(symbol => {
      const amount = allShares[symbol].amount;
      return ({ symbol, amount });
    });

  console.log(sharesArray);
  return res.json(sharesArray);
}
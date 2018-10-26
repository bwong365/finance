/**
 * AlphaVantage can return either price info or stock origin info.
 * Consolidate these two calls into one and return combined info to client
 */
module.exports = function returnSearch(req, res) {
  const { symbol, price, change } = req.quote;
  const { '2. name': name } = req.topResult;
  res.json({ name, symbol, price, change });
}
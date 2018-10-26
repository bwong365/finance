module.exports = function sendQuote(req, res) {
  const { symbol, price, change } = req.quote;
  const { '2. name': name } = req.topResult;
  res.json({ name, symbol, price, change });
}
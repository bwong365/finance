module.exports = function sendQuote(req, res) {
  res.json(req.body.quote);
}
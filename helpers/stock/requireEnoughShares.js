module.exports = function validateShareRequest(req, res, next) {
  const { shares } = req.body;
  const sharesOwned = req.shareInfo.sharesOwned

  if (shares > sharesOwned) {
    return res.json({ message: 'Not enough shares!' });
  }

  next();
}
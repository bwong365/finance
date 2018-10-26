/**
 * Gatekeepr middleware for selling stock
 * ensure shares owned is greater than
 * the requested amount to sell
 */
module.exports = function requireEnoughShares(req, res, next) {
  const { shares } = req.body;
  const sharesOwned = req.shareInfo.sharesOwned;

  if (shares > sharesOwned) {
    return res.json({ error: 'Not enough shares!' });
  }

  next();
}
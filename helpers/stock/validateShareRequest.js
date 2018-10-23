module.exports = function validateShareRequest(req, res, next) {
  const { shares } = req.body;

  if (shares <= 0) {
    return res.json({ message: 'Invalid request!' });
  }

  next();
}
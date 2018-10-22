module.exports = function confirmToken(req, res) {
  console.log('here');
  res.status(200).json({
    username: req.username
  })
}
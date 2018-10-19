const jwt = require('jsonwebtoken');

module.exports = function login(req, res) {
  const { user } = req.body;
  const secret = process.env.JWT_SECRET_OR_KEY;
  const token = jwt.sign({user}, secret, {expiresIn: '1h'});
  res.json(token);
}
const bcrypt = require('bcryptjs');

/**
 * Middleware
 * Hash a password with bcrypt and attach the hash to
 * the request body as req.body.hash
 */
module.exports = async function hashPassword(req, res, next) {
  const { password, confirm } = req.body;
  if (password !== confirm) return res.status(400).json(`passwords don't match!`);
  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  
  // Attach the hash to the request body and call next
  req.body.hash = hash;
  next();
}
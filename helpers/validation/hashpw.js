const bcrypt = require('bcryptjs');

/**
 * Middleware
 * Hash a password with bcrypt and attach the hash to
 * the request body as req.body.hash
 */
module.exports = async function hashPassword(req, _, next) {
  // Hash the password
  const hash = await bcrypt.hash(req.body.password, 10);
  
  // Attach the hash to the request body and call next
  req.body.hash = hash;
  next();
}
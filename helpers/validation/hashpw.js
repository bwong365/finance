const bcrypt = require('bcryptjs');

module.exports = async function hashPassword(req, _, next) {
  // Hash the password
  const hash = await bcrypt.hash(req.body.password, 10);
  
  // Attach the hash to the request body and call next
  req.body.hash = hash;
  next();
}
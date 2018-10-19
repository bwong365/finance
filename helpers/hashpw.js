const bcrypt = require('bcryptjs');

module.exports = async function hashPassword(req, _, next) {
  // hash the password
  const hash = await bcrypt.hash(req.body.password, 10);
  console.log(req.body.password);
  // attach the hash to the request body and call next
  req.body.hash = hash;
  next();
}
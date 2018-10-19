const bcrypt = require('bcryptjs');

module.exports = async function hashPassword(req, _, next) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.hash = hash;
  console.log('hashed');
  next();
}
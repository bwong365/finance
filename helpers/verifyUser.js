const bcrypt = require('bcryptjs');
const queryPG = require('./queryPG');

// password validation middleware
module.exports = async function verifyUser(req, res, next) {
  const { user, password } = req.body;
  const query = {
    text: 'SELECT pwhash FROM users WHERE username = $1',
    values: [user]
  }
  
  try {
    const dbData = await queryPG(query);
    const hash = dbData.rows[0].pwhash
    console.log(password);
    const valid = await bcrypt.compare(password, hash);
    if (valid) {
      next();
    } else {
      res.sendStatus(401);
    }
    
  } catch (e) {
    console.log(e);
    res.json(e);
  }
}
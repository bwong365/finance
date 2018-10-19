const router   = require('express').Router();
const hashpw   = require('./helpers/hashpw');
const register = require('./helpers/register');


router.route('/').get((_, res) => {
  res.json({message: 'Welcome to finance!'});
})

router.route('/register').post(hashpw, register);

module.exports = router;
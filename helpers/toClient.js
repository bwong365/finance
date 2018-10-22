const path = require('path');

module.exports = function toClient(_, res) {
  res.sendFile(path.join(__dirname,'..','/view/public/index.html'));
}
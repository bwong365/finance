/**
 * After validation of token, send username back to client
 */
module.exports = function confirmToken(req, res) {
  const { username } = req;
  
  res.status(200).json({
    username
  });
}
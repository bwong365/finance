/**
 * Rounds JavaScript numbers to two decimal places for currency arithmetic
 */
module.exports = function monetize(x) {
  return Math.round(x * 100) / 100;
}
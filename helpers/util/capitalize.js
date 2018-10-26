/**
 * Capitalize word so that fiNanCe becomes Finance
 */
module.exports = function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
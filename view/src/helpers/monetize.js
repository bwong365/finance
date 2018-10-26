/**
 * Rounds JavaScript numbers to two decimal places for currency arithmetic
 */
const monetize= x => Math.round(x * 100) / 100;

export default monetize;
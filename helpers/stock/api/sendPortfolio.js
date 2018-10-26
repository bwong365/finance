const axios = require('axios');

/**
 * @param list of stock from aggregateShares and balance
 * calls AlphaVantage for a current price of each stock.
 * @returns stock list and balance to the client
 */
module.exports = async function processShares(req, res) {
  const { allShares, balance } = req;

  try {
    const promises = Object.keys(allShares)
      // Remove non-positive share amounts from the printed portfolio
      .filter(symbol => allShares[symbol].amount > 0)
      // Get prices from AlphaVantage
      .map(async symbol => {
        const amount = allShares[symbol].amount;
        const price = await aV(symbol);
        return ({ symbol, price, amount });
      });
    
    // Await the calls above in parallel
    const shares = await Promise.all(promises);
    
    // Send portfolio to client
    return res.json({balance, shares});
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

// Get prices for share symbol
async function aV(symbol) {
  try {
    const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    const apiKey = process.env.AV_API;
    const uri = url + symbol + '&apikey=' + apiKey;

    const quoteData = await axios(uri);

    const { '05. price': price } = quoteData.data['Global Quote'];

    return price;
  } catch (e) {
    console.log(e);
  }

}
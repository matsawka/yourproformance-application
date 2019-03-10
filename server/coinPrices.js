const axios = require("axios");

getCoinPrice = coin => {
  axios
    .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + coin)
    .then(res => {
      console.log("res data", res.data);
      return res.data;
    })
    .catch(err => console.log(err));
};

module.exports = getCoinPrice;

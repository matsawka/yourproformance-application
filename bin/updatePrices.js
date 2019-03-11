var Airtable = require("airtable");
const coinPrices = require("./coinPrices");
const axios = require("axios");

axios
  .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "BTC")
  .then(res => {
    console.log("res data", res.data);
    base("COLLATERAL").update(
      "recagbR8TUhKoK2D6",
      {
        USD_EQUIV: res.data.result.Last,
        Updated: moment()
      },
      function(err, record) {
        if (err) {
          console.error("airtable:::", err);
          return;
        }
        console.log(record.getId());
      }
    );
    //moment()
    response.send();
  })
  .catch(err => console.log(err));

axios
  .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "ETH")
  .then(res => {
    console.log("res data", res.data);
    base("COLLATERAL").update(
      "recxj9ICFUm6HFJc1",
      {
        USD_EQUIV: res.data.result.Last,
        Updated: moment()
      },
      function(err, record) {
        if (err) {
          console.error("airtable:::", err);
          return;
        }
        console.log(record.getId());
      }
    );
  })
  .catch(err => console.log(err));

axios
  .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "BCH")
  .then(res => {
    console.log("res data", res.data);
    base("COLLATERAL").update(
      "recQhetyDNX5PGuT8",
      {
        USD_EQUIV: res.data.result.Last,
        Updated: moment()
      },
      function(err, record) {
        if (err) {
          console.error("airtable:::", err);
          return;
        }
        console.log(record.getId());
      }
    );
  })
  .catch(err => console.log(err));

axios
  .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "LTC")
  .then(res => {
    console.log("res data", res.data);
    base("COLLATERAL").update(
      "recmXbo8EPOL3oTbW",
      {
        USD_EQUIV: res.data.result.Last,
        Updated: moment()
      },
      function(err, record) {
        if (err) {
          console.error("airtable:::", err);
          return;
        }
        console.log(record.getId());
      }
    );
  })
  .catch(err => console.log(err));

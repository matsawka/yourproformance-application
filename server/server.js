const moment = require("moment-timezone");
const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();
var Airtable = require("airtable");
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const cors = require("cors");

var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app07QDgAAsXbpFax"
);

app.use(express.static(publicPath));

app.use(
  cors({
    origin: "*"
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// create a GET route
app.get("/api/getCoinPrice", (req, response) => {
  const coin = req.query.coin;
  axios
    .get("https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + coin)
    .then(res => {
      console.log("res data", res.data);
      response.send({ coin_price: res.data.result.Last });
    })
    .catch(err => console.log(err));
});

app.get("/api/setCoinPrices", (req, response) => {
  const coin = req.query.coin;
  axios
    .get(
      "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "BTC"
    )
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
    .get(
      "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "ETH"
    )
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
    .get(
      "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "BCH"
    )
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
    .get(
      "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-" + "LTC"
    )
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
});

app.listen(port, () => {
  console.log("Server is up on port!", port);
});

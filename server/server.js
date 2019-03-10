const moment = require("moment-timezone");
const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();
var Airtable = require("airtable");
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const coinPrices = require("./coinPrices");
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
      base("COIN PRICES").update(
        "recdmindGnHr8QJn7",
        {
          Price: res.data.result.Last,
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
      base("COIN PRICES").update(
        "rectx5NDJPB3SPcJB",
        {
          Price: res.data.result.Last,
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
      base("COIN PRICES").update(
        "recJBcCENEmdCSoAh",
        {
          Price: res.data.result.Last,
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
      base("COIN PRICES").update(
        "recFAT5o1IKn3Nsph",
        {
          Price: res.data.result.Last,
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
  console.log("Server is up!");
});

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STIPE_SECRET_KEY);

// App Config
const app = express();
//  middlewares

app.use(cors({origin: true}));
app.use(express.json());

// Api Routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // Ok - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// example end-point
// http://127.0.0.1:5001/clone-588d3/us-central1/api

// listen command

exports.api = functions.https.onRequest(app);

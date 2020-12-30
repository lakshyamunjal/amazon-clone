const functions = require('firebase-functions');
const constants = require('./constants');

// using Express for backend and hosting it on firebase
const express = require('express');
// cors is required to make cross-platform requests
const cors = require('cors');

const stripeSecretKey = constants.stripePrivateKey;
const stripe = require("stripe")(stripeSecretKey);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());        // transmit data in JSON form

// API routes
app.get("/demo", (request, response) => {
    response.status(200).send("I am Demo!");
})

app.get("/", (request, response) => {
    response.status(200).send("Hello World!");
})


app.post("/payments/create", async (request, response) => {
    const orderAmount = request.query.total;
    const customerEmail = request.query.email;
    console.log("Payment request received: ", orderAmount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: "INR",
        description: `Customer email: ${customerEmail}`,
        //        capture_method: 'manual',       // manual means that customer has to authorize the payment
    });
    // .then((req, resp) => {
    //     console.log("Payment initialted :::: Amount: ", req.amount/100, ", Trans id: ", req.id);
    // }).catch(err => {
    //     console.log("Error: ", err);
    // });
    // 201 is for something is created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.post("/cancelorder", async (req, res) => {
    const paymentIntent = req.query.paymentIntent;
    const refund = await stripe.refunds.create({
        payment_intent: paymentIntent,
    });

    res.status(200).send("Cancel order");
});

// listeners
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-155e6/us-central1/api
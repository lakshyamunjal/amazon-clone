const functions = require('firebase-functions');

// using Express for backend and hosting it on firebase
const express = require('express');
// cors is required to make cross-platform requests
const cors = require('cors');

const stripeSecretKey = "sk_test_51HzjrRLqYQpz7YYBvK2UI32DVKOm49KXgCCX1PJa6fOizaVMdckQjbnf9VXRNFWRjURxe73AVst4gkvn2PJVKnOq00wWlYdzdq";
const stripe = require("stripe")(stripeSecretKey);

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());        // transmit data in JSON form

// API routes
app.get("/demo", (request, response) => {
    response.status(200).send("I am Demo!");
})

app.get("/", (request, response) => {
    response.status(200).send("Hello World!");
})

app.post("/payments/create", async(request, response) => {
    const orderAmount = request.query.total;
    const customerEmail = request.query.email;
    console.log("Payment request received: " , orderAmount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: "INR",
        description: `Customer email: ${customerEmail}`
    });
    // 201 is for something is created
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    });
});

// listeners
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-155e6/us-central1/api
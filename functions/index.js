const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { response } = require('express');
const stripe = require('stripe')(
  'sk_test_51HQ8irFDpEzIimoDTk3D5NJ21NQydNZeM1cbSpnNUMcjO1po94CMLLl388c9vC7XvFnGRW4pGNwjt8FV1HkK99Kd00DclwBKzL'
)

//Set up API
//below is wht is req to get express app to up and running on cloud funcs for bck end

//-App config
const app = express();

//-Middlewares
app.use(cors({ origin: true })); //for security
app.use(express.json()); //to send data and parse data in JSON  formar

//-API routes
app.get('/', (request, response) => response.status(200).send('hello world'))//setup dummy routes to test things r working
// to test how end point works:
app.get('/ks', (request, response) => response.status(200).send('Whats up KS!!'));
//hit url http://localhost:5001/clone-ks-d479a/us-central1/api/ks
// we create end point with post req tht says when we make the post req to /payments/create
//it must be async and accepts req and resp objs - this is how API works
app.post('/payments/create', async (request, response) => {
  const total = request.query.total; //total was the query param payements.js in request url
  //can also use request params instead of query
    console.log("Payement Request Recieved for this amount", total);
 //stripe part  
    const paymentIntent = await stripe.paymentIntents.create({ 
        amount: total, // total is in subunits of currency since thts hpw stripe accepts
        currency: "usd", //changing into correct currency code
    });

    //If OK; ie if paymnt done ;send bck this response with following
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

}) // we used /payments/create in payements.js for req url
//in useEffect() to get ClientSecret

//generated API url - example endpoint
//http://localhost:5001/clone-ks-d479a/us-central1/api


//-Listen command
exports.api = functions.https.onRequest(app) // this is whr card functions come in
//https bcz its secure func




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

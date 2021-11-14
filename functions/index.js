const functions = require("firebase-functions");
const express = require("express");
const cors= require("cors");
const stripe = require("stripe")(
"sk_test_51Iqf7mSHJiymtJN43ID5vRlMLx0vjp4IE0cQBG6aC0d4soa6MCSdZzY5MjtPht40WLLwpdWl5R4OpgP6kxHHPzqc00GXplsYn5"
)

//API

//- App config
const app = express();

//-Middlewares
app.use(cors({origin : true}))
app.use(express.json());

//-Api routes
app.get('/', (request,response) => response.status(200).send('hello world'))

app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;

    console.log("Payment Request recieved for this amount >>>",total); 
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount :total,
        currency : 'inr'
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})
//Listen command
exports.api = functions.https.onRequest(app);

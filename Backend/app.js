const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app=express();
const path = require('path');


const authuser_route = require('./routes/user-auth.js');
const routes_route = require('./routes/routeRouter');
const bus_route = require('./routes/busRouter');
const booking_route = require('./routes/bookingRouter');
const payment_route = require('./routes/paymentRouter');

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({extended:true}));


const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,

})

const connection=mongoose.connection;
 connection.once("open",() =>  {
     console.log('db connected');
 }).catch(err => console.log( err ));

//routes

app.use('/api',authuser_route)
app.use('/api',routes_route)
app.use('/api',bus_route)
app.use('/api',booking_route)
app.use('/api',payment_route)

module.exports = app;



const express = require("express");
const mongoose = require("mongoose");

const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors'); // this will use for middle wear
const expressValidator = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree')
const orderRoutes  = require('./routes/order');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//app;
const app = express();

// database

mongoose.connect('mongodb+srv://roney1001:ab123456@eshopdb.vkggytz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
} ,()=>{
    console.log("connected to database");
});

// middle ware
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(cors(corsOptions));
// Routes middleware
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(braintreeRoutes);
app.use(orderRoutes);


const port  = process.env.PORT || 8000 ;

app.listen(port , ()=>{
    console.log("server is runnig on port 8000");
})
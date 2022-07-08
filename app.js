const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors'); // this will use for middle wear
const expressValidator = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree')
const orderRoutes  = require('./routes/order');



//app;
const app = express();

// database

mongoose.connect(process.env.URL,{
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
app.use(cors());
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
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const axios = require('axios');
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser');

const API_PORT = 3001;
const app = express();

// this is our MongoDB database
const dbRoute = "mongodb://shunhahaha:z132465798@ds123050.mlab.com:23050/hahaha";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(session({
        key: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));
app.use(cookieParser());
//*********************************************************************************
//  route
//*********************************************************************************
require('./routes.js')(app); // load our routes and pass in our app


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

module.exports = app;










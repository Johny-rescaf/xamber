"use strict";

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var device = require('express-device');

// Routes
const linkRoutes = require('./routes/linkRoutes');
const redirectionRoutes = require('./routes/redirectionRoutes');

let cors = require("cors");

const app = express();

// get config vars
dotenv.config();
app.use(bodyParser.json());
app.use(device.capture());
/* 
  Configure CORS to accept all requests, But in production only the client domain
  will be accepted 
*/
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))

let PORT = process.env.PORT || 3001

// load routes
app.use(linkRoutes);
app.use(redirectionRoutes);

app.listen(PORT, () => {
  console.log(`App service started on port: ${PORT}`);
});

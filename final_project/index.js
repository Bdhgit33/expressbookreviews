const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { regd_users, authenticated } = require('./router/auth_users.js');
const { general } = require('./router/general.js');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false })); // Body parser middleware
app.use(express.json());
app.use(
  session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true })
);

app.use("/customer/auth", authenticated);
app.use("/customer/public", regd_users);
app.use("/", general);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));


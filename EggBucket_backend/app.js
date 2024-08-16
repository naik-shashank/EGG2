var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors"); // Import the cors middleware
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var outletpartnerRouter = require('./routes/outlet_partner');
var deliverypartnerRoute = require('./routes/delivery_driver');
var customerRouter = require('./routes/customer');
var vendorRouter = require('./routes/vendor');
var orderRouter = require('./routes/order');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var paymentRouter = require('./routes/payments');

require("./models/db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from React app's build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Define API routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/outletPartners', outletpartnerRouter);
app.use('/deliveryDrivers', deliverypartnerRoute);
app.use('/customers', customerRouter);
app.use('/vendors', vendorRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);

// Catch-all route: Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling for 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

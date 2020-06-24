const express = require("express");
const ExpressError = require('./expressError');

const app = express();

// for processing JSON:
app.use(express.json());

// for processing forms:
app.use(express.urlencoded({ extended: true }));

const userRoutes =

app.use(function(req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});
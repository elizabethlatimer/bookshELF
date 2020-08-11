const express = require("express");
const ExpressError = require('./helpers/expressError');
const cors = require("cors");

const app = express();

// for processing JSON:
app.use(express.json());

// for processing forms:
app.use(express.urlencoded({ extended: true }));

// to allow cors between frontend and backend
app.use(cors());


const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
// const bookRoutes = require("./routes/bookRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

app.use("/users", userRoutes);
// app.use("/books", bookRoutes);
app.use("/collections", collectionRoutes);
app.use("/", authRoutes);

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

module.exports = app;

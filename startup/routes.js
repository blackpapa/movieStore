const genres = require("../routers/genres");
const movies = require("../routers/movies");
const customers = require("../routers/customers");
const rentals = require("../routers/rentals");
const auth = require("../routers/auth");
const error = require("../middlewares/error");
const users = require("../routers/users");
const returns = require("../routers/returns");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
};

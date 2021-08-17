const genres = require("./routers/genres");
const movies = require("./routers/movies");
const customers = require("./routers/customers");
const rentals = require("./routers/rentals");
const auth = require("./routers/auth");
const error = require("./middlewares/error");
const users = require("./routers/users");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");
const express = require("express");
const app = express();

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => logger.info("Connected with database..."))
  .catch((err) => logger.info(err, "Fail to connect with database..."));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, logger.info(`Listening on port ${port}...`));

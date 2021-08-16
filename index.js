const genres = require("./routers/genres");
const movies = require("./routers/movies");
const customers = require("./routers/customers");
const rentals = require("./routers/rentals");
const error = require("./middlewares/error");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const app = express();

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected with database..."))
  .catch((err) => console.log(err, "Fail to connect with database..."));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));

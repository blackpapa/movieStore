const mongoose = require("mongoose");
const config = require("config");
const logger = require("./logging")();

module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info("Connected with database..."))
    .catch((err) => logger.info(err, "Fail to connect with database..."));
};

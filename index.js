const express = require("express");
const app = express();

const logger = require("./startup/logging")();
require("./startup/validation")();
require("./startup/config")();
require("./startup/cors")(app);
require("./startup/graphql")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3900;
var server = app.listen(port, logger.info(`Listening on port ${port}...`));

module.exports = server;

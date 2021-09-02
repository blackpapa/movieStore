const express = require("express");
const cors = require("cors");
const app = express();

const logger = require("./startup/logging")();
require("./startup/validation")();
require("./startup/config")();
app.use(cors());
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3900;
var server = app.listen(port, logger.info(`Listening on port ${port}...`));

module.exports = server;

const schema = require("./schema/schema");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();

const logger = require("./startup/logging")();
require("./startup/validation")();
require("./startup/config")();
app.use("graphql/", graphqlHTTP({ schema, graphiql: true }));
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3900;
var server = app.listen(port, logger.info(`Listening on port ${port}...`));

module.exports = server;

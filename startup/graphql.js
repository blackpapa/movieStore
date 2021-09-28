const schema = require("../schema/schema");
const { graphqlHTTP } = require("express-graphql");

module.exports = function (app) {
  app.use("/api/graphql", graphqlHTTP({ schema, graphiql: true }));
};

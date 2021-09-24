const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
} = require("graphql");

const movieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    numberInStock: { type: GraphQLInt },
    dailyRentalRate: { type: GraphQLInt },
    liked: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: movieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from database
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
} = require("graphql");
const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");

const movieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: genreType },
    numberInStock: { type: GraphQLInt },
    dailyRentalRate: { type: GraphQLInt },
    liked: { type: GraphQLBoolean },
  }),
});

const genreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: movieType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        //code to get data from database
        return await Movie.findById(args.id);
      },
    },
    genre: {
      type: genreType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Genre.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

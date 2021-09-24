const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental } = require("../models/rental");

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
    movies: {
      type: new GraphQLList(movieType),
      async resolve(parent, args) {
        const movies = await Movie.find();
        return movies.filter((m) => m.genre._id.toString() === parent.id);
      },
    },
  }),
});

const customerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    isGold: { type: GraphQLBoolean },
    phone: { type: GraphQLString },
  }),
});

const rentalType = new GraphQLObjectType({
  name: "Rental",
  fields: () => ({
    id: { type: GraphQLString },
    customer: { type: customerType },
    movie: { type: movieType },
    dateOut: { type: GraphQLString },
    dateReturn: { type: GraphQLString },
    rentalFee: { type: GraphQLInt },
  }),
});

//RootQuery
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
    customer: {
      type: customerType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Customer.findById(args.id);
      },
    },
    rental: {
      type: rentalType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Rental.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(movieType),
      async resolve(parent, args) {
        return await Movie.find();
      },
    },
    genres: {
      type: new GraphQLList(genreType),
      async resolve(parent, args) {
        return await Genre.find();
      },
    },
    customers: {
      type: new GraphQLList(customerType),
      async resolve(parent, args) {
        return await Customer.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

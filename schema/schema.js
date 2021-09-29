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

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GenreType },
    numberInStock: { type: GraphQLInt },
    dailyRentalRate: { type: GraphQLInt },
    liked: { type: GraphQLBoolean },
    rentalsCount: {
      type: GraphQLInt,
      async resolve(parent, args) {
        const rentals = await Rental.find();
        return rentals.filter((r) => r.movie._id.toString() === parent.id)
          .length;
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      async resolve(parent, args) {
        const movies = await Movie.find();
        return movies.filter((m) => m.genre._id.toString() === parent.id);
      },
    },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    isGold: { type: GraphQLBoolean },
    phone: { type: GraphQLString },
    rentals: {
      type: new GraphQLList(RentalType),
      async resolve(parent, args) {
        const rentals = await Rental.find();
        return rentals.filter((r) => r.customer._id.toString() === parent.id);
      },
    },
  }),
});

const RentalType = new GraphQLObjectType({
  name: "Rental",
  fields: () => ({
    _id: { type: GraphQLString },
    customer: { type: CustomerType },
    movie: { type: MovieType },
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
      type: MovieType,
      args: { _id: { type: GraphQLString } },
      async resolve(parent, args) {
        //code to get data from database
        return await Movie.findById(args._id);
      },
    },
    genre: {
      type: GenreType,
      args: { _id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Genre.findById(args._id);
      },
    },
    customer: {
      type: CustomerType,
      args: { _id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Customer.findById(args._id);
      },
    },
    rental: {
      type: RentalType,
      args: { _id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Rental.findById(args._id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      async resolve(parent, args) {
        return await Movie.find();
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      async resolve(parent, args) {
        return await Genre.find();
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parent, args) {
        return await Customer.find();
      },
    },
    rentals: {
      type: new GraphQLList(RentalType),
      async resolve(parent, args) {
        return await Rental.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

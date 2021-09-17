const mongoose = require("mongoose");
const config = require("config");
const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { Customer } = require("./models/customer");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

const customers = [
  { name: "Andy", isGold: true, phone: "168888" },
  { name: "Janelle", isGold: true, phone: "898928" },
  { name: "Ben", isGold: false, phone: "3312524" },
  { name: "Jack", isGold: true, phone: "168888" },
  { name: "Trevoer", isGold: true, phone: "898928" },
  { name: "Matrias", isGold: false, phone: "3312524" },
];

async function seed() {
  mongoose.connect(config.get("db"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await Genre.deleteMany({});
  await Movie.deleteMany({});
  await Customer.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));

    await Movie.insertMany(movies);
  }
  await Customer.insertMany(customers);

  mongoose.disconnect();
}

seed();

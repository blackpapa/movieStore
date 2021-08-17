const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validateRental } = require("../models/rental");
const validateObjectId = require("../middlewares/validateObjectId");
const validate = require("../middlewares/validate");
const _ = require("lodash");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
require("express-async-errors");

Fawn.init(mongoose);

router.post("/", validate(validateRental), async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer id");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie id");
  if (movie.numberInStock === 0)
    return res.status(404).send("The movie is out of stock");

  const rental = new Rental({
    customer: _.pick(customer, ["name", "phone", "isGold"]),
    movie: _.pick(movie, ["title", "dailyRentalRate"]),
  });

  try {
    await new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (error) {
    console.log(error);
  }

  res.send(rental);
});

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  if (!rentals) return res.status(404).send("No rental in the database");

  res.send(rentals);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with given id cannot be found");

  res.send(rental);
});

module.exports = router;

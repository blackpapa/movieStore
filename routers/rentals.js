const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validateRental } = require("../models/rental");
const _ = require("lodash");
const validate = require("../middlewares/validate");
const express = require("express");
const router = express.Router();

router.post("/", validate(validateRental), async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer id");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie id");

  const rental = new Rental({
    customer: _.pick(customer, ["name", "phone", "isGold"]),
    movie: _.pick(movie, ["title", "dailyRentalRate"]),
  });

  await rental.save();
  res.send(rental);
});

module.exports = router;

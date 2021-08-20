const auth = require("../middlewares/auth");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId) return res.status(400).send("Invalid customerId");
  if (!req.body.movieId) return res.status(400).send("Invalid movieId");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("The rental is not found");

  if (rental.dateReturn)
    return res.status(400).send("The rental is already processed");

  rental.dateReturn = Date.now();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  //Increase movie stock
  await Movie.findByIdAndUpdate(req.body.movieId, {
    $inc: { numberInStock: 1 },
  });

  res.send(rental);
});

module.exports = router;

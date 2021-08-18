//{customerId, movieId}
//return 401 if user is not logged in
//return 400 if customerId is not provided
//return 400 if movieId is not provided
//return 404 if rental is not found
//return 400 if rental is already process
//set return date
//calculate fee
//increase the stock
//return rental
const auth = require("../middlewares/auth");
const { Rental } = require("../models/rental");
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

  res.send("test");
});

module.exports = router;

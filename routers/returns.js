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
const express = require("express");
const router = express.Router();

router.post("/", auth, (req, res) => {
  if (!req.body.customerId) return res.status(400).send("Invalid customerId");
  if (!req.body.movieId) return res.status(400).send("Invalid movieId");
});

module.exports = router;

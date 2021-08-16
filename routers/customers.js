const validate = require("../middlewares/validate");
const validateObjectId = require("../middlewares/validateObjectId");
const { validateCustomer, Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();
require("express-async-errors");

router.post("/", validate(validateCustomer), async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  await customer.save();
  res.send(customer);
});

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  if (!customers) return res.status(404).send("No customer in the database");

  res.send(customers);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(400).send("The customer with given id cannot be found");

  res.send(customer);
});

router.put(
  "/:id",
  validateObjectId,
  validate(validateCustomer),
  async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true }
    );

    if (!customer)
      return res.status(400).send("The customer with given id cannot be found");
    res.send(customer);
  }
);

router.delete("/:id", validateObjectId, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(400).send("The customer with given id cannot be found");
  res.send(customer);
});

module.exports = router;

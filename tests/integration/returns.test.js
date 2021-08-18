const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
const moment = require("moment");
let server;

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;
  let token;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index");
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        isGold: true,
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "monster",
        numberInStock: 10,
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
  });

  it("should return 401 if user is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not porvided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not porvided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if rental is not found", async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 400 if rental is already processed", async () => {
    rental.dateReturn = Date();
    await rental.save();

    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should set return date", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);

    expect(res.status).toBe(200);
    expect(rentalInDb.dateReturn).toBeDefined();
  });

  it("should calculate rental fee", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);

    expect(res.status).toBe(200);
    expect(rentalInDb.rentalFee).toBe(14);
  });
});

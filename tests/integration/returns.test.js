const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;
  let token;

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
    const res = await request(server).post("/api/returns");
    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not porvided", async () => {
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId });
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not porvided", async () => {
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId });
    expect(res.status).toBe(400);
  });
});

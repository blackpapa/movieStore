const request = require("supertest");
const server = require("../../index");

describe("/api/returns", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(server).post("/api/returns");
    expect(res.status).toBe(401);
  });
});

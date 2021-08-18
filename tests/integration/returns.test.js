const request = require("supertest");
const server = require("../../index");

describe("/api/returns", () => {
  it("should return test", async () => {
    const res = await request(server).post("/api/returns");
    expect(res.status).toBe(200);
  });
});

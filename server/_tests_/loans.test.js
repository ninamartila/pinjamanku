const app = require("../app");
const request = require("supertest");

describe("GET / [SUCCESS CASE]", () => {
  test("Should return array of object of loans", (done) => {
    request(app)
      .get("/")
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).not.toHaveLength(0);
        expect(body[0]).toHaveProperty("firstName");
        expect(body[0]).toHaveProperty("lastName");
        expect(body[0]).toHaveProperty("amount");
        expect(body[0]).toHaveProperty("tenor");
        done();
      })
      .catch((err) => done(err));
  });
});

// describe("")

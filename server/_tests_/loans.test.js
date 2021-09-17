const app = require("../app");
const request = require("supertest");

describe("GET /loans [SUCCESS CASE]", () => {
  test("Should return array of object of loans", (done) => {
    request(app)
      .get("/loans")
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).not.toHaveLength(0);
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("firstName");
        expect(body[0]).toHaveProperty("lastName");
        expect(body[0]).toHaveProperty("amount");
        expect(body[0]).toHaveProperty("tenor");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /loans [SUCCESS CASE]", () => {
  test("Should return an object about details Loan", (done) => {
    const newLoan = {
      borrowerId,
      lenderId,
      amount: 3000000,
      tenor: 60,
    };
    request(app)
      .post("/loans")
      .set("access_token", access_token)
      .send(newLoan)
      .then(({ status, body }) => {
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("borrowerId");
        expect(body).toHaveProperty("lenderId");
        expect(body).toHaveProperty("amount");
        expect(body).toHaveProperty("tenor");
        done();
      })
      .catch((err) => done(err));
  });
});

const app = require("../app");
const request = require("supertest");

const userToRegister = {
  firstName: "Adang",
  lastName: "Sarbin",
  email: "adangsarbin@mail.com",
  password: "adangsarbin",
  phoneNumber: "0812345",
  address: "Jakarta",
};

describe("POST /register [SUCCESS CASE]", () => {
  test("Should return object about User", (done) => {
    request(app)
      .post("/register")
      .send(userToRegister)
      .then(({ status, body }) => {
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("firstName", userToRegister.firstName);
        expect(body).toHaveProperty("lastName", userToRegister.lastName);
        expect(body).toHaveProperty("email", userToRegister.email);
        expect(body).toHaveProperty("phoneNumber", userToRegister.phoneNumber);
        expect(body).toHaveProperty("address", userToRegister.address);
        expect(body).not.toHaveProperty("password");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /register [FAIL CASE]", () => {
  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      firstName: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("first name cannot be null");
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      lastName: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("last name cannot be null");
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      email: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("email cannot be null");
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      password: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("password cannot be null");
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      phoneNumber: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("phone number cannot be null");
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let newUser = {
      ...userToRegister,
      address: null,
    };
    request(app)
      .post("/register")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("address cannot be null");
      })
      .catch((err) => done(err));
  });
});

describe("POST /login [SUCCESS CASE]", () => {
  test("Should return object with properties access_token, id, firstName, lastName", (done) => {
    const { firstName, lastName, phoneNumber, address, ...newUser } = userToRegister;
    request(app)
      .post("/login")
      .send(newUser)
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("firstName", firstName);
        expect(body).toHaveProperty("lastName", lastName);
        expect(body).not.toHaveProperty("password");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /login [FAIL CASE]", () => {
  test("Should return object with property message", (done) => {
    let userLogin = {
      email: "adangsarbin@mail.com",
      password: "adang",
    };
    request(app)
      .post("/login")
      .send(userLogin)
      .then(({ status, body }) => {
        expect(status).toBe(401);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("wrong email/password");
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with property message", (done) => {
    let userLogin = {
      email: "adangwakwaw@mail.com",
      password: "adangsarbin",
    };
    request(app)
      .post("/login")
      .send(userLogin)
      .then(({ status, body }) => {
        expect(status).toBe(401);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("wrong email/password");
        done();
      })
      .catch((err) => done(err));
  });
});

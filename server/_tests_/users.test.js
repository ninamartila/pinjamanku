const app = require("../app");
const request = require("supertest");
const nodemailer = require("../helpers/NodeMailer");
const createRoom = require("../helpers/dailyCo");
const { Lender, Borrower, Staff, sequelize } = require("../models");
const { queryInterface } = sequelize;

const lenderRegister = {
  firstName: "Adang",
  lastName: "Sarbin",
  email: "adangsarbin@mail.com",
  password: "adangsarbin",
  ktpCard: "ktpCard",
  selfPicture: "selfPicture",
  phoneNumber: "09182723",
  address: "jakarta",
  birthDate: "07/07/1998",
  bankCode: "BRI",
  holderName: "Adang Sarbin",
  accountNumber: "0192071247",
  occupation: "Manager",
  role: "lender",
  status: "Verified",
};

const borrowerRegister = {
  firstName: "Ujang",
  lastName: "Sarden",
  email: "ujangsarden@mail.com",
  password: "ujangsarden",
  ktpCard: "ktp card",
  selfPicture: "self picture",
  phoneNumber: "09347989",
  address: "Jakarta",
  birthDate: "09/09/2000",
  bankCode: "BCA",
  holderName: "Ujang Sarden",
  accountNumber: "091347234",
  occupation: "Staff",
  role: "borrower",
  status: "Pending",
};

const staffRegister = {
  firstName: "Admin",
  lastName: "Jago",
  name: "Admin Jago",
  email: "adminjago@protonmail.com",
  password: "adminjago",
};
let lenderId;

jest.mock("../helpers/NodeMailer");
jest.mock("../helpers/dailyCo");

beforeAll((done) => {
  const lenderNew = {
    ...lenderRegister,
    email: "lender@mail.com",
  };
  const borrowerNew = {
    ...borrowerRegister,
    email: "borrower@mail.com",
  };
  const staffNew = {
    ...staffRegister,
    email: "staff@protonmail.com",
  };
  Lender.create(lenderNew)
    .then(() => Borrower.create(borrowerNew))
    .then(() => Staff.create(staffNew))
    .then(() => Lender.findOne({ where: { email: lenderNew.email } }))
    .then((res) => (lenderId = res.id))
    .then(() => done())
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Lenders", {})
    .then(() => queryInterface.bulkDelete("Borrowers", {}))
    .then(() => queryInterface.bulkDelete("Staffs", {}))
    .then(() => done())
    .catch((err) => done(err));
});

describe("POST /users/register [SUCCESS CASE]", () => {
  test("201 success register lender", (done) => {
    request(app)
      .post("/users/register")
      .send(lenderRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("dataValues");
        done();
      });
  });
  test("201 success register borrower", (done) => {
    nodemailer.mockReturnValue({
      error: null,
      result: "testing",
    });
    createRoom.mockReturnValue(true);
    request(app)
      .post("/users/register")
      .send(borrowerRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("dataValues");
        done();
      });
  });
  test("201 success register staff", (done) => {
    request(app)
      .post("/users/register")
      .send(staffRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("dataValues");
        done();
      });
  });
});

describe("POST /users/register [FAIL CASE]", () => {
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      firstName: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("first name cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      lastName: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("last name cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      email: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("email cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      email: "adangsarbin@mail.com",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("email is already exists");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      email: "adangsarbinmailcom",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("invalid email");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      password: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("password cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      ktpCard: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("ktp card cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      selfPicture: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("self picture cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      phoneNumber: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("phone number cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      address: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("address cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      birthDate: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("birth date cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      bankCode: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("bank code cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      holderName: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("holder name cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      accountNumber: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("account number cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      occupation: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("occupation cannot be empty");
        done();
      });
  });
  test("400 fail register", (done) => {
    const newUser = {
      ...lenderRegister,
      role: "",
    };
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message).toContain("Invalid Email");
        done();
      });
  });
});

describe("POST /users/login [SUCCESS CASE]", () => {
  test("200 success login lender", (done) => {
    request(app)
      .post("/users/login")
      .send(lenderRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("firstName", lenderRegister.firstName);
        expect(body).toHaveProperty("lastName", lenderRegister.lastName);
        expect(body).toHaveProperty("role", lenderRegister.role);
        done();
      });
  });
  test("200 success login Staff", (done) => {
    request(app)
      .post("/users/login")
      .send(staffRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", `${staffRegister.firstName} ${staffRegister.lastName}`);
        expect(body).toHaveProperty("role", "admin");
        done();
      });
  });
});

describe("GET /users [SUCCESS CASE]", () => {
  test("200 success get all users", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("lender");
        expect(body).toHaveProperty("borrower");
        done();
      });
  });
});

describe("GET /users/:userId [SUCCESS CASE]", () => {
  test("200 success get user by id", (done) => {
    request(app)
      .get(`/users/${lenderId}`)
      .query({ role: "lender" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        done();
      });
  });
});

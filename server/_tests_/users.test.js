const app = require("../app");
const request = require("supertest");
const nodemailer = require("../helpers/NodeMailer");
const createRoom = require("../helpers/dailyCo");
const { Lender, Borrower, Staff, sequelize } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const lenderRegister = {
  firstName: "Adang",
  lastName: "Sarbin",
  email: "adangsarbin@mail.com",
  password: "adangsarbin",
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
let borrowerId;
let lenderToken;
let borrowerToken;

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
    .then((res) => {
      lenderId = res.id;
      lenderToken = generateToken({ id: res.id, email: res.email, role: res.role });
    })
    .then(() => Borrower.findOne({ where: { email: borrowerNew.email } }))
    .then((res) => {
      borrowerId = res.id;
      borrowerToken = generateToken({ id: res.id, email: res.email, role: res.role });
    })
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
    createRoom.mockReturnValue("aku.com");
    request(app)
      .post("/users/register")
      .send(borrowerRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("dataValues");
        expect(body).toHaveProperty("dailyURL");
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
  test("200 success login lender", (done) => {
    request(app)
      .post("/users/login")
      .send(borrowerRegister)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("firstName", borrowerRegister.firstName);
        expect(body).toHaveProperty("lastName", borrowerRegister.lastName);
        expect(body).toHaveProperty("role", borrowerRegister.role);
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

describe("POST /users/login [FAIL CASE]", () => {
  test("400 fail login", (done) => {
    const newUser = {
      email: "adminjago@protonmail.com",
      password: "adangsarbin",
    };
    request(app)
      .post("/users/login")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email/password invalid");
        done();
      });
  });
  test("400 fail login", (done) => {
    const newStaff = {
      email: "abangjago@protonmail.com",
      password: "adminjago",
    };
    request(app)
      .post("/users/login")
      .send(newStaff)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email/password invalid");
        done();
      });
  });
  test("400 fail login", (done) => {
    const newLender = {
      email: "adangsarbin@mail.com",
      password: "123",
    };
    request(app)
      .post("/users/login")
      .send(newLender)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email/password invalid");
        done();
      });
  });
  test("400 fail login", (done) => {
    const newBorrower = {
      email: "adangsarden@mail.com",
      password: "ujangsarden",
    };
    request(app)
      .post("/users/login")
      .send(newBorrower)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email/password invalid");
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

describe("GET /users/:userId [FAIL CASE]", () => {
  test("200 success get user by id", (done) => {
    request(app)
      .get(`/users/${lenderId}`)
      .query({ role: "president" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You have invalid role");
        done();
      });
  });
});

describe("GET /users/:userId [SUCCESS CASE]", () => {
  test("200 success get user by id", (done) => {
    request(app)
      .get(`/users/${borrowerId}`)
      .query({ role: "borrower" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        done();
      });
  });
});

describe("PUT /users [SUCCESS CASE]", () => {
  const updateUser = {
    firstName: "Idin",
    lastName: "Samak",
    phoneNumber: "01892127",
    address: "Jonggol",
    bankCode: "BNI",
    holderName: "Idin Samak",
    accountNumber: "91829",
  };
  test("200 success update user", (done) => {
    request(app)
      .put("/users")
      .set({ access_token: lenderToken })
      .send(updateUser)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "User has been updated");
        done();
      });
  });
  test("200 success update user", (done) => {
    request(app)
      .put("/users")
      .set({ access_token: borrowerToken })
      .send(updateUser)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "User has been updated");
        done();
      });
  });
});

describe("PUT /users [FAIL CASE]", () => {
  test("401 fail update user", (done) => {
    const updateUser = {
      firstName: "Idin",
      lastName: "Samak",
      phoneNumber: "01892127",
      address: "Jonggol",
      bankCode: "BNI",
      holderName: "Idin Samak",
      accountNumber: "91829",
    };
    request(app)
      .put("/users")
      .send(updateUser)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You need to login first");
        done();
      });
  });
});

describe("PUT /users/:userId [SUCCESS CASE]", () => {
  test("200 success update user by id", (done) => {
    request(app)
      .put(`/users/${borrowerId}`)
      .send({ status: "Verified" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "User status has been updated");
        done();
      });
  });
});

describe("DELETE /users/:userId [SUCCESS CASE]", () => {
  test("200 success delete user by id", (done) => {
    request(app)
      .delete(`/users/${lenderId}`)
      .query({ role: "lender" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", `User with id ${lenderId} has been deleted`);
        done();
      });
  });
  test("200 success delete user by id", (done) => {
    request(app)
      .delete(`/users/${borrowerId}`)
      .query({ role: "borrower" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", `User with id ${borrowerId} has been deleted`);
        done();
      });
  });
});

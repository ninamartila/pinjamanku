const app = require("../app");
const request = require("supertest");
const { Staff, Lender, Borrower, Loan, sequelize } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const lenderRegister = {
  firstName: "Adang",
  lastName: "Cunin",
  email: "adangcunin@mail.com",
  password: "adangcunin",
  ktpCard: "ktpCard",
  selfPicture: "selfPicture",
  phoneNumber: "09182723",
  address: "jakarta",
  birthDate: "07/07/1998",
  bankCode: "BRI",
  holderName: "Adang Cunin",
  accountNumber: "0192071247",
  occupation: "Manager",
  role: "lender",
  status: "Verified",
};

const borrowerRegister = {
  firstName: "Ujang",
  lastName: "Tongkol",
  email: "ujangtongkol@mail.com",
  password: "ujangtongkol",
  ktpCard: "ktp card",
  selfPicture: "self picture",
  phoneNumber: "09347989",
  address: "Jakarta",
  birthDate: "09/09/2000",
  bankCode: "BCA",
  holderName: "Ujang Tongkol",
  accountNumber: "091347234",
  occupation: "Staff",
  role: "borrower",
  status: "Pending",
};

const staffRegister = {
  firstName: "Admin",
  lastName: "Jaga",
  name: "Admin Jaga",
  email: "adminjaga@protonmail.com",
  password: "adminjaga",
};

const loan = {
  externalID: "ahiw",
  status: "pending",
  initialLoan: "5000000",
  tenor: "90",
  timeRemaining: "90",
};

let lenderId;
let borrowerId;
let loanId;
let lenderToken;
let borrowerToken;
let failToken;

beforeAll((done) => {
  const lenderNew = {
    ...lenderRegister,
    email: "lenderlender@mail.com",
  };
  const borrowerNew = {
    ...borrowerRegister,
    email: "borrowerborrower@mail.com",
  };
  const staffNew = {
    ...staffRegister,
    email: "staffstaff@protonmail.com",
  };
  Lender.create(lenderNew)
    .then(() => Borrower.create(borrowerNew))
    .then(() => Staff.create(staffNew))
    .then(() => Lender.findOne({ where: { email: lenderNew.email } }))
    .then((res) => {
      lenderId = res.id;
      lenderToken = generateToken({ id: res.id, email: res.email, role: res.role });
      failToken = generateToken({ ini: "token" });
    })
    .then(() => Borrower.findOne({ where: { email: borrowerNew.email } }))
    .then((res) => {
      borrowerId = res.id;
      borrowerToken = generateToken({ id: res.id, email: res.email, role: res.role });
    })
    .then(() => {
      const newLoan = {
        ...loan,
        lenderID: lenderId,
        borrowerID: borrowerId,
      };
      return Loan.create(newLoan);
    })
    .then(() => Loan.findOne({ where: { externalID: "ahiw" } }))
    .then((res) => {
      loanId = res.id;
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

describe("GET /loans [SUCCESS CASE]", () => {
  test("200 success get all loans", (done) => {
    request(app)
      .get("/loans")
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });
  test("200 success get loans by lender id", (done) => {
    request(app)
      .get("/loans/lender")
      .set({ access_token: lenderToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });
  test("200 success get loans by borrower id", (done) => {
    request(app)
      .get("/loans/borrower")
      .set({ access_token: borrowerToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });
});

describe("GET /loans [FAIL CASE]", () => {
  test("401 invalid token", (done) => {
    request(app)
      .get("/loans/lender")
      .set({ access_token: failToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You need to login first");
        done();
      });
  });
  test("403 invalid token lender", (done) => {
    request(app)
      .get("/loans/lender")
      .set({ access_token: borrowerToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "User does not Have Access");
        done();
      });
  });
  test("403 invalid token borrower", (done) => {
    request(app)
      .get("/loans/borrower")
      .set({ access_token: lenderToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "User does not Have Access");
        done();
      });
  });
});

// describe("GET /loans/:loanID [SUCCESS CASE]", () => {
//   test("200 success get loan by id", (done) => {
//     request(app)
//       .get(`/loans/${loanId}`)
//       .set({ access_token: lenderToken })
//       .end((err, res) => {
//         if (err) return done(err);
//         const { status, body } = res;
//         expect(status).toBe(200);
//         expect(body.length).toBeGreaterThanOrEqual(0);
//         done();
//       });
//   });
// });

describe("GET /loans/:loanID [FAIL CASE]", () => {
  test("404 fail get loan by id", (done) => {
    request(app)
      .get(`/loans/1`)
      .set({ access_token: lenderToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("msg", "not found");
        done();
      });
  });
});

describe("POST /invoice/lender [SUCCESS CASE]", () => {
  test("200 success create invoice", (done) => {
    request(app)
      .post("/loans/invoice/lender")
      .set({ access_token: lenderToken })
      .send({ amount: "5000000", tenor: "90" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("externalID");
        expect(body).toHaveProperty("invoiceURL");
        done();
      });
  });
});

// describe("POST /invoice/borrower [SUCCESS CASE]", () => {
//   test("200 success create invoice", (done) => {
//     request(app)
//       .post("/loans/invoice/borrower")
//       .set({ access_token: borrowerToken })
//       .send({ loanID: loanId })
//       .end((err, res) => {
//         if (err) return done(err);
//         const { status, body } = res;
//         expect(status).toBe(200);
//         expect(body).toHaveProperty("externalID");
//         expect(body).toHaveProperty("invoiceURL");
//         done();
//       });
//   });
// });

describe("POST /disburse/withdrawal [SUCCESS CASE]", () => {
  test("200 success withdraw", (done) => {
    request(app)
      .post("/loans/disburse/withdrawal")
      .set({ access_token: lenderToken })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toBeDefined();
        done();
      });
  });
});

// describe("POST /disburse/loan [SUCCESS CASE]", () => {
//   test("200 success loan", (done) => {
//     request(app)
//       .post("/loans/disburse/withdrawal")
//       .set({ access_token: borrowerToken })
//       .end((err, res) => {
//         if (err) return done(err);
//         const { status, body } = res;
//         expect(status).toBe(200);
//         expect(body).toBeDefined();
//         done();
//       });
//   });
// });

describe("POST /endpoint/invoice [SUCCESS CASE]", () => {
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/invoice")
      .set({ access_token: borrowerToken })
      .send({ external_id: "invoice-borrower-ahiw", status: "FAILED" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "failed");
        done();
      });
  });
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/invoice")
      .set({ access_token: borrowerToken })
      .send({ external_id: "invoice-borrower-ahiw", status: "PAID" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "complete");
        expect(body).toHaveProperty("id");
        done();
      });
  });
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/invoice")
      .set({ access_token: lenderToken })
      .send({ external_id: "invoice-lender-ahiw", status: "PAID" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "active");
        expect(body).toHaveProperty("id");
        done();
      });
  });
});

describe("POST /endpoint/disbursement [SUCCESS CASE]", () => {
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/disbursement")
      .set({ access_token: borrowerToken })
      .send({ external_id: "invoice-borrower-ahiw", status: "FAILED" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "failed");
        done();
      });
  });
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/disbursement")
      .set({ access_token: borrowerToken })
      .send({ external_id: "invoice-borrower-ahiw", status: "COMPLETED" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "borrower");
        expect(body).toHaveProperty("id");
        done();
      });
  });
  test("200 success make invoice", (done) => {
    request(app)
      .post("/loans/endpoint/disbursement")
      .set({ access_token: lenderToken })
      .send({ external_id: "invoice-lender-ahiw", status: "COMPLETED" })
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("status", "lender");
        expect(body).toHaveProperty("id");
        done();
      });
  });
});

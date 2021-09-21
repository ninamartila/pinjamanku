const app = require("../app");
const request = require("supertest");

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

let lenderId;
let borrowerId;
let lenderToken;
let borrowerToken;

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

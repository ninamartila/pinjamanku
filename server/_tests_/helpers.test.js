require("dotenv").config();
const createRoom = require("../helpers/dailyCo");
const sendMail = require("../helpers/NodeMailer");

describe("Check helpers [SUCCESS CASE]", () => {
  test("nodemail return true", (done) => {
    sendMail({ url: "daily.co" }, "pinjamanku@protonmail.com")
      .then((resultNodeMailer) => {
        expect(resultNodeMailer).toHaveProperty("error");
        expect(resultNodeMailer).toHaveProperty("result");
        done();
      })
      .catch((err) => done(err));
  });

  test("daily.co return true", (done) => {
    createRoom("ujangKardus", "pinjamanku@protonmail.com")
      .then((resultDailyCo) => {
        expect(resultDailyCo).toHaveProperty("error");
        expect(resultDailyCo).toHaveProperty("url");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Check helpers [FAIL CASE]", () => {
  test("nodemail return false", (done) => {
    sendMail({}, "pinjamanku@protonmail.com")
      .then((resultNodeMailer) => {
        expect(resultNodeMailer).toHaveProperty("error");
        done();
      })
      .catch((err) => done(err));
  });
  test("daily.co return false", (done) => {
    createRoom(null, "pinjamanku@protonmail.com")
      .then((resultDailyCo) => {
        expect(resultDailyCo).toHaveProperty("error");
        done();
      })
      .catch((err) => done(err));
  });
});

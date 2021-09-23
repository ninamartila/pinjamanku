require("dotenv").config();
const createRoom = require("../helpers/dailyCo");
const sendMail = require("../helpers/NodeMailer");

describe("Check helpers [SUCCESS CASE]", () => {
  test("nodemail return true", (done) => {
    sendMail({ url: "daily.co" }, "pinjamanku@protonmail.com")
      .then((resultNodeMailer) => {
        expect(resultNodeMailer).toHaveProperty("error");
        expect(resultNodeMailer).toHaveProperty("url");
        done();
      })
      .catch((err) => done(err));
  });

  test("daily.co return true", (done) => {
    const currentDate = new Date();
    createRoom(`${currentDate.getTime()}`, "pinjamanku@protonmail.com")
      .then((resultDailyCo) => {
        expect(resultDailyCo).toHaveProperty("error");
        expect(resultDailyCo).toHaveProperty("dailyUrl");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Check helpers [FAIL CASE]", () => {
  test("nodemail return false", (done) => {
    sendMail({}, "")
      .then((resultNodeMailer) => {
        expect(resultNodeMailer).toHaveProperty("error");
        done();
      })
      .catch((err) => done(err));
  });
  test("daily.co return false", (done) => {
    let error;
    createRoom("12345678910111213abcdefghijklmnopqrstuvwzyzopqrs", "pinjamanku@protonmail.com")
      .then((result) => {
        resultDailyCo = result;
      })
      .catch((err) => {
        error = err;
      })
      .finally(() => {
        expect(error).toHaveProperty("error");
        done();
      });
  });
});

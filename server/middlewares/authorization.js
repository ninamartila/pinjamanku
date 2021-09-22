const { Lender, Borrower, Staff } = require("../models");

const isLender = (req, res, next) => {
  const { id, role } = req.user;
  console.log(req.user);
  if (id) {
    if (role === "lender") {
      Lender.findByPk(id)
        .then((result) => {
          if (result) {
            next();
          } else {
            next({ name: "NotFound", type: "Lender" });
          }
        })
        .catch((error) => {
          next(error);
        });
    } else {
      console.log("ikin");
      next({ name: "Forbidden" });
    }
  } else {
    next({ name: "InvalidToken" });
  }
};

const isBorrower = (req, res, next) => {
  const { id, role } = req.user;
  console.log(req.user);
  if (id) {
    if (role === "borrower") {
      Borrower.findByPk(id)
        .then((result) => {
          if (result) {
            next();
          } else {
            next({ name: "NotFound", type: "Borrower" });
          }
        })
        .catch((error) => {
          next(error);
        });
    } else {
      console.log("akan");
      next({ name: "Forbidden" });
    }
  } else {
    next({ name: "InvalidToken" });
  }
};

module.exports = { isLender, isBorrower };

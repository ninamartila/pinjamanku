const { Lender, Borrower, Staff } = require("../models");

const isLender = (req, res, next) => {
  const { id, role } = req.user;
  Lender.findByPk(id)
    .then((result) => {
      if (result) {
        if (role === "lender") {
          next();
        } else {
          next({ name: "Forbidden" });
        }
      } else {
        next({ name: "NotFound", type: "Lender" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const isBorrower = (req, res, next) => {
  const { id, role } = req.user;
  Lender.findByPk(id)
    .then((result) => {
      if (result) {
        if (role === "borrower") {
          next();
        } else {
          next({ name: "Forbidden" });
        }
      } else {
        next({ name: "NotFound", type: "Borrower" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { isLender, isBorrower };

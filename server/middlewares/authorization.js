const { Lender, Borrower } = require("../models");

const isLender = (req, res, next) => {
  const { id, role } = req.user;
  if (id) {
    if (role === "lender") {
      Lender.findByPk(id)
        .then((result) => {
          if (result) {
            next();
          } else {
            /* istanbul ignore next */
            next({ name: "NotFound", type: "Lender" });
          }
        })
        .catch((error) => {
          /* istanbul ignore next */
          next({ name: "InvalidToken" });
        });
    } else {
      /* istanbul ignore next */
      next({ name: "Forbidden" });
    }
  } else {
    /* istanbul ignore next */
    next({ name: "InvalidToken" });
  }
};

const isBorrower = (req, res, next) => {
  const { id, role } = req.user;
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
          /* istanbul ignore next */
          next({ name: "InvalidToken" });
        });
    } else {
      /* istanbul ignore next */
      next({ name: "Forbidden" });
    }
  } else {
    /* istanbul ignore next */
    next({ name: "InvalidToken" });
  }
};

module.exports = { isLender, isBorrower };

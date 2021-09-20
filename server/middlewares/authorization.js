const { User } = require("../models");

const authorization = (req, res, next) => {
  const role = req.user.role;
  const id = Number(req.params.id);

  User.findByPk(id)
    .then((result) => {
      if (result) {
        if (role === "borrower") {
          next();
        } else if (role === "lender") {
          next();
        } else {
          next({ name: "Unauthorized" });
        }
      } else {
        next({ name: "NotFound", type: "User" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { authorization };

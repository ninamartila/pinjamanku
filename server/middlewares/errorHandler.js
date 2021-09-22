const errorHandler = function (err, req, res, nex) {
  const name = err.name;
  let resultError;
  if (err.errors) {
    resultError = err.errors.map((el) => el.message);
  }

  switch (name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: resultError });
      break;
    /*istanbul ignore next*/
    case "SequelizeDatabaseError":
      res.status(400).json({ message: resultError });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: resultError });
      break;
    case "Unauthorized":
      res.status(401).json({ message: "Email/password invalid" });
      break;
    case "InvalidEmail":
      res.status(400).json({ message: "Invalid Email" });
      break;
    case "InvalidToken":
      res.status(401).json({ message: "You need to login first" });
      break;
    case "InvalidRole":
      res.status(401).json({ message: "You have invalid role" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "User does not Have Access" });
      break;
    case "NotFound":
      res.status(404).json({ message: `${err.type} Not Found` });
      break;
    /*istanbul ignore next*/
    default:
      res.status(500).json({ message: "Internet Server Error" });
      break;
  }
};

module.exports = { errorHandler };

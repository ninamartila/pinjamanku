const errorHandler = function (err, req, res, nex) {
  console.log(err);
  const name = err.name;
  let resultError;
  if (err.errors) {
    resultError = err.errors.map((el) => el.message);
  }

  switch (name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: resultError });
      break;
    case "SequelizeDatabaseError":
      res.status(400).json({ message: resultError });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: resultError });
      break;
    case "ImageInvalid":
      res.status(400).json({ message: err.message });
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
    case "Forbidden":
      res.status(403).json({ message: "User does not Have Access" });
      break;
    case "NotFound":
      res.status(404).json({ message: `${err.type} Not Found` });
      break;
    default:
      res.status(500).json({ message: "Internet Server Error" });
      break;
  }
};

module.exports = { errorHandler };

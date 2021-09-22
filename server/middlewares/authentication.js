const { verifyToken } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    const payload = verifyToken(access_token);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    if (payload.id) {
      next();
    } else {
      next({ name: "InvalidToken" });
    }
  } else {
    next({ name: "InvalidToken" });
  }
};

module.exports = authentication;

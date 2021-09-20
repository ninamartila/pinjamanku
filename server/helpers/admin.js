const isAdmin = (email) => {
  const splittedEmail = email.split("@");
  if (splittedEmail[splittedEmail.length - 1] === "protonmail.com") {
    return true;
  } else {
    return false;
  }
};

module.exports = { isAdmin };

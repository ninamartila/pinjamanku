const isAdmin = (email) => {
  if (email) {
    const splittedEmail = email.split("@");
    if (splittedEmail[splittedEmail.length - 1] === process.env.DOMAIN_EMAIL_ADMIN) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = { isAdmin };

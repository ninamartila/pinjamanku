const nodeMailer = require("nodemailer");

async function sendMail(roomLink, email) {
  let userMail = email;
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "pinjamkuproject@gmail.com",
      pass: "Na1robi!",
    },
  });
  let message = {
    from: "pinjamkuproject@gmail.com",
    to: [userMail, "pinjamanku@protonmail.com"],
    subject: "test",
    html: `<p>${roomLink.url}</p>`,
  };
  try {
    const result = await transporter.sendMail(message);
    if (result) {
      return {
        error: null,
        result,
      };
    }
  } catch (error) {
    /* istanbul ignore next */
    return {
      error,
    };
  }
}
module.exports = sendMail;

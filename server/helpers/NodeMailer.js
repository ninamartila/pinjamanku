const nodeMailer = require("nodemailer");

function sendMail(email) {
  let userMail = email;
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "younghp9@gmail.com",
      pass: "GangSetan12345",
    },
  });
  let message = {
    from: "younghp9@gmail.com",
    to: userMail,
    subject: "test",
    html: `<h1>Masuk H1</h1>`,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("failed");
      return err;
    } else {
      console.log("successs");
      return null;
    }
  });
}
module.exports = sendMail;

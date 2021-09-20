const nodeMailer = require("nodemailer");

function sendMail(roomLink, email) {
  let userMail = email;
  let room = roomLink.data;
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "pinjamkuproject@gmail.com",
      pass: "Na1robi!",
    },
  });
  let message = {
    from: "pinjamkuproject@gmail.com",
    to: userMail,
    subject: "test",
    html: `<p>${room.url}</p>`,
  };
  transporter.sendMail();
  transporter
    .sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
        console.log("failed");
        return err;
      } else {
        console.log("success");
        return null;
      }
    })
    .catch((err) => console.log(err));
}
module.exports = sendMail;

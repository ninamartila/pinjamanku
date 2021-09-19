const nodeMailer = require("nodemailer");

function sendMail(roomLink, email) {
  let userMail = email;
  let room = roomLink.data;
  console.log(room, "<<<<<<<<<<<<<<<");
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "itemshop.phase2@gmail.com",
      pass: "dharma123!",
    },
  });
  let message = {
    from: "itemshop.phase2@gmail.com",
    to: userMail,
    subject: "test",
    html: `<p>${room.url}</p>`,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      console.log("failed");
    } else {
      console.log("successs");
    }
  });
}
module.exports = sendMail;

const axios = require("axios");
const sendMail = require("./NodeMailer");

function createRoom(roomName, userEmail, nbf) {
  const currentDate = new Date();
  axios({
    method: "post",
    url: "https://api.daily.co/v1/rooms",
    headers: {
      authorization: `Bearer ${process.env.API_KEY_DAILY_CO}`,
    },
    data: {
      properties: {
        owner_only_broadcast: false,
        nbf: nbf, //?? kok bingung ya indra
        exp: (currentDate.getTime() + 60000) / 1000,
        enable_chat: true,
        max_participants: 4,
      },
      name: roomName,
      privacy: "public",
    },
  })
    .then((room) => {
      if (!sendMail(room, userEmail)) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err;
    });
}
module.exports = createRoom;

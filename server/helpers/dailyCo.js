const axios = require("axios");
const sendMail = require("./NodeMailer");

function createRoom(roomName, userEmail) {
  axios({
    method: "post",
    url: "https://api.daily.co/v1/rooms",
    headers: {
      authorization:
        "Bearer 29609d3d8928f72e9c0d09e17160a43f85642e2f7a651e540f35a9395c5517c8",
    },
    data: {
      properties: {
        owner_only_broadcast: false,
        nbf: 1596819600,
        enable_chat: true,
        max_participants: 2,
      },
      name: roomName,
      privacy: "public",
    },
  })
    .then((room) => {
      sendMail(room, userEmail);
      console.log(room);
    })
    .catch((err) => {
      return err;
    });
}
module.exports = createRoom;

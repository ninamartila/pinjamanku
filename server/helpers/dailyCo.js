const axios = require("axios");
const sendMail = require("./NodeMailer");

function createRoom(roomName, userEmail) {
  const currentDate = new Date();
  let dailyUrl;
  let error;
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "https://api.daily.co/v1/rooms",
      headers: {
        authorization: `Bearer ${process.env.API_KEY_DAILY_CO}`,
      },
      data: {
        properties: {
          owner_only_broadcast: false,
          exp: Math.ceil((currentDate.getTime() + 3600000) / 1000),
          enable_chat: true,
          max_participants: 2,
        },
        name: roomName,
        privacy: "public",
      },
    })
      .then(({ data }) => {
        return sendMail(data, userEmail);
      })
      .then(({ error, url }) => {
        dailyUrl = url;
        resolve({
          error,
          dailyUrl,
        });
      })
      .catch((err) => {
        /* istanbul ignore next */
        reject({ error: err });
      });
  });
}
module.exports = createRoom;

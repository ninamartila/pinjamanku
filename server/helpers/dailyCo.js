const axios = require("axios");
const sendMail = require("./NodeMailer");

async function createRoom(roomName, userEmail) {
  const currentDate = new Date();
  try {
    const result = await axios({
      method: "post",
      url: "https://api.daily.co/v1/rooms",
      headers: {
        authorization: `Bearer ${process.env.API_KEY_DAILY_CO}`,
        // authorization: `Bearer 8b8b5a44c122c56ddf936637d5cc1b0eecec8afe030137b52b176fbec1ed0c08`,
      },
      data: {
        properties: {
          owner_only_broadcast: false,
          exp: (currentDate.getTime() + 60000) / 1000,
          enable_chat: true,
          max_participants: 2,
        },
        name: roomName,
        privacy: "public",
      },
    });
    const { data } = result;
    const emailSent = await sendMail(data, userEmail);
    if (emailSent.accepted.length) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
module.exports = createRoom;

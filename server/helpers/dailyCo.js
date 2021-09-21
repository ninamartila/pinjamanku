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
    });
    const { data } = result;
    const { error, result: nodemailerResult } = await sendMail(data, userEmail);

    if (nodemailerResult) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
module.exports = createRoom;

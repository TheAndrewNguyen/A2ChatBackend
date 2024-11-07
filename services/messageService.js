const { realtimeDb } = require("../configs/firebaseConfig");

const sendMessage = async (messageContent, userId, timestamp, lobbyCode) => {
  try {
    console.log('1')
    const ref = realtimeDb.ref('messages/' + lobbyCode);
    const newMessageRef = ref.push();
    await newMessageRef.set({
      messageContent,
      userId,
      timestamp
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = { sendMessage };

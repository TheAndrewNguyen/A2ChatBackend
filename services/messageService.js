const { realtimeDb } = require("../configs/firebaseConfig");

const sendMessage = async (messageContent, userId, timestamp, lobbyCode) => {
  try {
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

const getMessages = async (lobbyCode) => {
  try {
    const ref = realtimeDb.ref('messages/' + lobbyCode);
    const messages = [];

    // Return a promise that resolves with the sorted messages
    return new Promise((resolve, reject) => {
      ref.orderByChild('timestamp').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          messages.push(childSnapshot.val());
        });
        resolve(messages);  // Resolve with the sorted messages
      }, (error) => {
        reject(error);  // Reject in case of an error
      });
    });
  } catch (error) {
    console.error("Error fetching messages", error);
    throw error;
  }
};


module.exports = { sendMessage, getMessages };

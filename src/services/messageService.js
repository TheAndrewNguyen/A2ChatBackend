const e = require("express");
const { realtimeDb } = require("../../configs/firebaseConfig");

//sends a message to lobby 
//if lobby is not created inside of realtime yet it will create a lobby
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

//TODO make this async realtime or move it to the frontend 
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


//deletes the lobby from firebase realtime 
const deleteLobby = async(lobbyCode) => {
  const ref = realtimeDb.ref('messages/') //reference to database lobby 
  const lobby = ref.child(lobbyCode)
  lobby.set(null, (error) => {
    if(error) { //note: will only log error if theres an error accessing the database 
      console.error(`Error while trying to delete messages in lobby: ${lobbyCode}`)
    } else {
      console.log(`Data deleted succesfully in lobby: ${lobbyCode}`)
    }
  }) 
} 

module.exports = { sendMessage, getMessages, deleteLobby };

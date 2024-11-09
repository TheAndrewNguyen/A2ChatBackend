const { admin, db } = require("../configs/firebaseConfig");
const { documentSchema } = require("../models/lobbyModel");
const messageService = require("./messageService")

//check if the lobby exists in the db throws an error if not returns true if a lobby exists
async function checkDbconnectionandIfLobbyExists(lobbyId) {
  try {
    if (!db) {
      console.error("Firestore instance is not initialized");
      throw new Error("FireStore instance is not initalized");
    }

    //get the doc ref
    let lobbyDocRef = db.collection("lobbies").doc(lobbyId);
    let doc = await lobbyDocRef.get();

    if (!doc.exists) {
      console.error(`function checkIfLobbyExists: Lobby ${lobbyId} not found`);
      throw new Error(`Lobby with ID ${lobbyId} not found`);
    }

    console.log(`function checkIfLobbyExists: Lobby ${lobbyId} found!`);

    return true;

  } catch (error) {
    console.error(
      `function checkIfLobbyExists: An error occured while trying to find the lobby: ${error}`
    );
    throw error;
  }
}

//creating a document in firestore for lobby
//called inside inside of routes
//returns lobbyID
async function createLobby(lobbyId) {
  try {
    let lobbiesCollection = db.collection("lobbies");
    const lobbyData = documentSchema(lobbyId)

    await lobbiesCollection.doc(lobbyId).set(lobbyData);
    console.log(`lobby created succesfully with join code ${lobbyId}`);

    return lobbyId//send up the lobby code 

  } catch (error) {
    console.error("Error while creating lobby:", error);
    throw error;
  }
}

//deleting a lobby in firestore
//called in a route
async function deleteLobby(lobbyId) {
  console.log(`Attemping to deleteLobby...${lobbyId}`);
  try {
    await checkDbconnectionandIfLobbyExists(lobbyId)

    let lobbies = db.collection("lobbies");
    let document = lobbies.doc(lobbyId);

    //deleteTheLobby
    await document.delete();

    console.log(`deletion of lobby ${lobbyId} succesful!`);
    return true 

  } catch (error) {
    console.error(`error: ${error}`);
    throw new Error(`Failed to delete lobby ${lobbyId}: ${error.message}`) 
  }
}

//check if user is in lobby
//make sure to run dbcheckConnectionandLobbyExists before this
async function checkIfUserInLobby(lobbyId, uid) {
  console.log(`Attemping to find user ${uid} in lobby ${lobbyId}`)
  try { 
    let docRef = db.collection("lobbies").doc(lobbyId)
    const snapshot = await docRef.get() 
    let data = snapshot.data() 
    let users = data.users
    
    for(let i = 0; i < users.length; i++) {
      if(users[i] == uid) {
        return true 
      }
    }

    return false 
    
  } catch(error) {
    console.error(`Failed to find user ${uid} in lobby ${lobbyId}: ${error}`)
    throw new Error(`Failed to find user ${uid} in lobby ${lobbyId}: ${error}`)
  }
}

async function addUserToLobby(lobbyId, uid) {
  try {
    let docRef = db.collection("lobbies").doc(lobbyId);

    //check if document exists
    await checkDbconnectionandIfLobbyExists(lobbyId)

    //add user to the users field of lobby
    await docRef.update({
      users: admin.firestore.FieldValue.arrayUnion(uid),
    });

    console.log(`User: ${uid} has been succesfully added to lobby: ${lobbyId}`)
    return true 

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to add user ${uid} to Lobby ${lobbyId}: ${error.message}`)
  }
}


//removal of users from lobby 
//if last user delete hte lobby
async function removeUserFromLobby(lobbyId, uid) {
  try {
    
    //check if user and document exists
    await Promise.all([
      checkDbconnectionandIfLobbyExists(lobbyId),
      checkIfUserInLobby(lobbyId, uid)
    ]);

    let docRef = db.collection("lobbies").doc(lobbyId);
    let snapshot = await docRef.get();
    let lobby_data = snapshot.data();
    let user_array = lobby_data.users;

    //if the function is called by the last user then delete the document
    if (user_array.length == 1) {
      await deleteLobby(lobbyId); //delete the lobby from firebase firestore
      await messageService.deleteLobby(lobbyId) //delete messages from firebase realtime

      console.log(`Lobby ${lobbyId} has been ended by last user`)
      return {
        success: true,
        message: `Lobby ${lobbyId} has been ended by last user`,
      };

    } else {
      //if the function is called with at least 2 users remove the user user that called it
      await docRef.update({
        users: admin.firestore.FieldValue.arrayRemove(uid),
      });
      console.log(`User ${uid} has been removed from Lobby: ${lobbyId}`)
      return {
        success: true,
        message: `User ${uid} has been removed from Lobby: ${lobbyId}`,
      };
    }

  } catch (error) {
    console.error(
      "An error has occured while trying to run the function removeUserFromLobby " + error
    );
    throw new Error(`An error has occured while trying to remove user ${uid} from lobby: ${lobbyId}: ${error.message})`
    )
  }
}

module.exports = {
  createLobby,
  deleteLobby,
  addUserToLobby,
  removeUserFromLobby,
};

//---------------------------------------------------------------------------------------------------------------------------------------------------/
//developer functions
async function getAllLobbies() {
  const setOfdocumentIds = new Set();

  const lobbiesRef = db.collection("lobbies");
  const snapshot = await lobbiesRef.get();
  snapshot.forEach((doc) => {
    setOfdocumentIds.add(doc.id);
  });

  return setOfdocumentIds;
}

//delete all lobbies inside of firestore database except for the permanent doc 
async function deleteAllLobbies() {
  const setOfdocumentIds = await getAllLobbies();
  for (const item of setOfdocumentIds) {
    if(item != "PERMANENTDOC") await deleteLobby(item);
  }
}

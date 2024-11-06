const { admin, db } = require("../configs/firebaseConfig");
const { documentSchema } = require("../models/lobbyModel");
const { authCheckIfUserExists } = require("./authServices");

//check if the lobby exists in the db
async function checkDbconnectionandIfLobbyExists(lobbyId) {
  try {
    if (!db) {
      console.error("Firestore instance is not initialized");
    }

    //get the doc ref
    let lobbyDocRef = db.collection("lobbies").doc(lobbyId);
    let doc = await lobbyDocRef.get();

    if (!doc.exists) {
      console.error(`function checkIfLobbyExists: Lobby ${lobbyId} not found`);
      return false;
    }

    console.log(`function checkIfLobbyExists: Lobby ${lobbyId} found!`);

    return true;
  } catch (error) {
    console.error(
      `function checkIfLobbyExists: An error occured while trying to find the lobby: ${error}`
    );
    return false;
  }
}

//creating a document in firestore for lobby
//called inside inside of routes
async function createLobby(lobbyId) {
  try {
    let lobbies = db.collection("lobbies");
    await lobbies.doc(lobbyId).set(documentSchema(lobbyId));
    console.log(`lobby created succesfully with join code ${lobbyId}`);
  } catch (error) {
    console.error("Error while creating lobby:", error);
  }
}

//deleting a lobby in firestore
//called in a route
async function deleteLobby(lobbyId) {
  console.log(`Attemping to deleteLobby... ${lobbyId}`);

  if (!(await checkDbconnectionandIfLobbyExists(lobbyId))) {
    console.error("Could not find Lobby");
    return {
      success: false,
      message: `Lobby: ${lobbyId} does not exist or an error occured while trying to find it`,
    };
  }

  try {
    let lobbies = db.collection("lobbies");
    let document = lobbies.doc(lobbyId);

    //deleteTheLobby
    await document.delete();

    console.log(`deletion of lobby ${lobbyId} succesful!`);
    return { success: true, message: `Lobby: ${lobbyId} deleted succesfully` };
  } catch (error) {
    console.error(`error: ${error}`);
    return {
      success: false,
      message: `An error occured while deleting ${lobbyId}:, ${error.message}`,
    };
  }
}

async function addUserToLobby(lobbyId, UID) {
  try {
    let docRef = db.collection("lobbies").doc(lobbyId);

    //check if document exists
    if (!(await checkDbconnectionandIfLobbyExists(lobbyId))) {
      console.error("Could not find Lobby");
      return {
        success: false,
        message: `Lobby: ${lobbyId} does not exist or an error occured while trying to find it`,
      };
    }

    //add user to the users field of lobby
    await docRef.update({
      users: admin.firestore.FieldValue.arrayUnion(UID),
    });

    return { success: true, message: `user ${UID} added succesffuly to lobby` };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error has occured when trying to update the lobby",
    };
  }
}

// TODO: implmeent single user removal and if they are the last user then also delete the lobby
async function removeUserFromLobby(lobbyId, UID) {
  try {
    //check if user and document exists
    const [lobbyExists, userExists] = await Promise.all([
      checkDbconnectionandIfLobbyExists(lobbyId),
      authCheckIfUserExists(UID),
    ]);

    //if lobby does not exist
    if (!lobbyExists) {
      console.error("Could not find Lobby");
      return { success: false, message: `Lobby ${lobbyId} could not be found` };
    }

    //if auth user does not exist
    if (!userExists) {
      console.error(`Could not find user ${UID}`);
      return { success: false, message: `User ${UID} could not be found` };
    }

    let docRef = db.collection("lobbies").doc(lobbyId);
    let snapshot = await docRef.get();
    let lobby_data = snapshot.data();
    let user_array = lobby_data.users;

    //if the function is called by the last user then delete the document
    if (user_array.length == 1) {
      await deleteLobby(lobbyId);
      return {
        success: true,
        message: `Lobby ${lobbyId} has been removed by the last user`,
      };
    } else { //if the function is called with at least 2 users remove the user user that called it 
      await docRef.update({
        users: admin.firestore.FieldValue.arrayRemove(UID),
      });
      return {
        success: true,
        message: `User ${UID} has been removed from Lobby: ${lobbyId}`,
      };
    }
  } catch (error) {
    console.error(
      "An error has occured while trying to run the function removeUserFromLobby " +
        error
    );
  }
}

module.exports = { createLobby, deleteLobby, addUserToLobby, removeUserFromLobby }

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

//delete all lobbies inside of firestore database
async function deleteAllLobbies() {
  const setOfdocumentIds = await getAllLobbies();
  for (const item of setOfdocumentIds) {
    await deleteLobby(item);
  }
}

// async function test(lobbyID) {
//     await createLobby(lobbyID)
//     await addUserToLobby(lobbyID, "R17FpKNLx3QGzT6T3ZliNLRfTFe2")
//     await addUserToLobby(lobbyID, "tOdMupM5wlUi86xdkldwDwOqLws2")
//     await removeUserFromLobby(lobbyID, "tOdMupM5wlUi86xdkldwDwOqLws2")
// }

// test("1234");
//deleteAllLobbies()

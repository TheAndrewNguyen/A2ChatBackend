
const { admin, db } = require('../configs/firebaseConfig') 
const { documentSchema } = require('../models/lobbyModel')

async function checkIfLobbyExists(lobbyID) {
    try {
        //get the doc ref 
        let lobbyDocRef = db.collection('lobbies').doc(lobbyID)
        let doc = await lobbyDocRef.get() 
        
        if(!doc.exists) {
            console.error(`function checkIfLobbyExists: Lobby ${lobbyID} not found`)
            return false; 
        }
        
        console.log(`function checkIfLobbyExists: Lobby ${lobbyID} found!`)

        return true

    } catch(error) {
        console.error(`function checkIfLobbyExists: An error occured while trying to find the lobby: ${error}`)
        return false
    }
}

//creating a document in firestore for lobby 
async function createLobby(lobbyCode) {
    if(!db) {
        console.error("Firestore instance is not initialized")
    } 

    try {
        let lobbies =  db.collection('lobbies')
        await lobbies.doc(lobbyCode).set(documentSchema(lobbyCode))
        console.log(`lobby created succesfully with join code ${lobbyCode}`)

    } catch(error) {
        console.error("Error while creating lobby:", error)
    }
}

//deleting a lobby in firestore
async function deleteLobby(lobbyId) {
    console.log(`Attemping to deleteLobby: ${lobbyId}`)
        
    try {
        let lobbies = db.collection('lobbies')
        let document = lobbies.doc(lobbyId)

        let documentExists = await document.get() 

        if(!documentExists.exists) {
            console.error(`document ${LobbyId} does not exist`)
            return { success: false, message: `Lobby: ${LobbyId} does not exist`}
        }

        //deleteTheLobby
        await document.delete()

        console.log(`deletion of lobby ${lobbyId} succesful!`)
        return {success: true, message: `Lobby: ${lobbyId} deleted succesfully`}

    } catch(error) {
        console.error(`error: ${error}`) 
        return {success: false, message: `An error occured while deleting ${lobbyId}:, ${error.message}`}
    }
}

async function addUserToLobby(lobbyId, UID) {
    try {
        let docRef = db.collection('lobbies').doc(lobbyId)
        
        //check if document exists 
        let snapshot = await docRef.get() 
        if(!snapshot.exists) {
            return {success: false, message: `Lobby: ${lobbyId} does not exists`}
        }

        //add user to the users field of lobby 
        await docRef.update({
            users: admin.firestore.FieldValue.arrayUnion(UID)
        })

        return{success: true, message: `user ${UID} added succesffuly to lobby`}
        
    } catch (error) {
        console.error(error)
        return {success: false, message: 'An error has occured when trying to update the lobby'}
    }
}

// TODO: implmeent single user removal and if they are the last user then also delete the lobby 
async function removeUserFromLobby(lobbyID, UID) {

    //check if the user exists


    //get the document / lobby 
    try { 
        let docRef = db.collection('lobbies').doc(lobbyID)
        let snapshot = await docRef.get()

        //if the document / lobby does not exist 
        if(!snapshot.exists) {
            return {success: false, message: `Lobby: ${lobbyID} does not exists`}
        }
    } catch(e) {
        console.log(`An error occured while trying to retreive the document/lobby error: ${e}`)
    }

    //TODO: implement a check for if the user exists 


    //get the data from the document 
    let lobby_data = snapshot.data() 
    let user_array = lobby_data.users
    
    //if the function is called by the last user then delete the document 
    if(user_array.length == 1) {
        await deleteLobby(lobbyID)
        return {success: true, message: `Lobby ${lobbyID} has been removed by the last user`}
    }

    //else delete the user that called the api 
    try {
        await docRef.update({
            users: admin.firestore.FieldValue.arrayRemove(UID)
        })
        return {success: true, message: `User ${UID} has been removed from Lobby: ${lobbyID}`}

    } catch(error) {
        return {success: false, message: `An error occured when trying to remove the user: ${UID} from Lobby: ${LobbyId} error: ${error}`}
    }
}



async function test() {
    await createLobby("12455")
    console.log(checkIfLobbyExists(12455))
    await addUserToLobby("12455", "TEST USER")
    await deleteLobby("12455")
}

test() 

const { admin, db } = require('../configs/firebaseConfig') 
const { documentSchema } = require('../models/lobbyModel')

//check if the lobby exists in the db 
async function checkDbconnectionandIfLobbyExists(lobbyId) {
    try {

        if(!db) {
            console.error("Firestore instance is not initialized")
        } 

        //get the doc ref 
        let lobbyDocRef = db.collection('lobbies').doc(lobbyId)
        let doc = await lobbyDocRef.get() 
        
        if(!doc.exists) {
            console.error(`function checkIfLobbyExists: Lobby ${lobbyId} not found`)
            return false; 
        }
        
        console.log(`function checkIfLobbyExists: Lobby ${lobbyId} found!`)

        return true

    } catch(error) {
        console.error(`function checkIfLobbyExists: An error occured while trying to find the lobby: ${error}`)
        return false
    }
}

//creating a document in firestore for lobby 
//called inside inside of routes 
async function createLobby(lobbyId) {
    try {
        let lobbies =  db.collection('lobbies')
        await lobbies.doc(lobbyId).set(documentSchema(lobbyId))
        console.log(`lobby created succesfully with join code ${lobbyId}`)

    } catch(error) {
        console.error("Error while creating lobby:", error)
    }
}

//deleting a lobby in firestore
//called in a route 
async function deleteLobby(lobbyId) {
    console.log(`Attemping to deleteLobby... ${lobbyId}`)
        
    if(!(await checkDbconnectionandIfLobbyExists(lobbyId))) {
        console.error("Could not find Lobby")
        return { success: false, message: `Lobby: ${lobbyId} does not exist or an error occured while trying to find it`}
    }

    try {
        let lobbies = db.collection('lobbies')
        let document = lobbies.doc(lobbyId)

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
        if(!(await checkDbconnectionandIfLobbyExists(lobbyId))) {
            console.error("Could not find Lobby")
            return { success: false, message: `Lobby: ${lobbyId} does not exist or an error occured while trying to find it`}
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
async function removeUserFromLobby(lobbyId, UID) {

    //check if the user exists
    if(!(await checkDbconnectionandIfLobbyExists(lobbyId))) {
        console.error("Could not find Lobby")
        return { success: false, message: `Lobby: ${lobbyId} does not exist or an error occured while trying to find it`}
    }

    //TODO: implement a check for if the user exists 


    //get the document / lobby 
    try { 
        let docRef = db.collection('lobbies').doc(lobbyId)
        let snapshot = await docRef.get()

        //if the document / lobby does not exist 
        if(!snapshot.exists) {
            return {success: false, message: `Lobby: ${lobbyId} does not exists`}
        }
    } catch(e) {
        console.log(`An error occured while trying to retreive the document/lobby error: ${e}`)
    }



    //get the data from the document 
    let lobby_data = snapshot.data() 
    let user_array = lobby_data.users
    
    //if the function is called by the last user then delete the document 
    if(user_array.length == 1) {
        await deleteLobby(lobbyId)
        return {success: true, message: `Lobby ${lobbyId} has been removed by the last user`}
    }

    //else delete the user that called the api 
    try {
        await docRef.update({
            users: admin.firestore.FieldValue.arrayRemove(UID)
        })
        return {success: true, message: `User ${UID} has been removed from Lobby: ${lobbyId}`}

    } catch(error) {
        return {success: false, message: `An error occured when trying to remove the user: ${UID} from Lobby: ${lobbyId} error: ${error}`}
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------/ 
//developer functions 
async function getAllLobbies() {
    
    const setOfdocumentIds = new Set() 

    const lobbiesRef = db.collection('lobbies')
    const snapshot = await lobbiesRef.get() 
    snapshot.forEach(doc => {
        setOfdocumentIds.add(doc.id)
    })

    return setOfdocumentIds
}

//delete all lobbies inside of firestore database 
async function deleteAllLobbies() {
    const setOfdocumentIds = await getAllLobbies()
    for(const item of setOfdocumentIds) {
        await deleteLobby(item) 
    }
    
}


async function test() {
    await createLobby("12455")
    console.log(await checkDbconnectionandIfLobbyExists("12455"))
    await addUserToLobby("12455", "TEST USER")
    await deleteLobby("12455") 
}

test() 
//deleteAllLobbies() 
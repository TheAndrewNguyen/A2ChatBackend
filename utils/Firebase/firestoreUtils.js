




//developer functions

//get all lobby ids and put them inside of a set 
//returns a set 
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

console.log(checkIfLobbyExists("0"))

module.exports = { createLobby, deleteLobby, addUserToLobby, removeUserFromLobby}
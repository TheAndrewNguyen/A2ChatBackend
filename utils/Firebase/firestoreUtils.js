
const { getFirestore } = require("firebase-admin/firestore");

let db; //global variable to connection to DB 
connectToFireStore() 

//connects to firestore 
async function connectToFireStore() {
    console.log("Attemping to connect to Firestore...")
    try {
        db = getFirestore() 
        console.log("Connection to Firestore succesful")
    } catch(error) {
        console.error("Error connecting to Firestore,", error) 
    } 
}

//Schema for firestore document 
function documentSchema(lobbyCode) {
    console.warn("FireStore", "Test schema ran")
    
    const currentUser = { uid: "user12345" }
    
    const test = {
        isActive: true,
        lobbyCode: lobbyCode,
        users: currentUser ? currentUser.uid : "No user logged in"
    };

    return test;
}

//creating a document in firestore 
async function createLobby(lobbyCode) {
    if(!db) {
        console.error("Firestore instance is not initialized")
    } 

    try {
        let lobbies =  db.collection('lobbies')
        await lobbies.doc(lobbyCode).set(documentSchema(lobbyCode))
        console.log("lobby created succesfully with join code ${lobbyCode}")
    } catch(error) {
        console.error("Error while creating lobby:", error)
    }
}

//deleting a lobby in firestore
async function deleteLobby(lobbyId) {
    console.log('Attemping to deleteLobby: {lobbyId}')

    try {
        let lobbies = db.collection('lobbies')
        let document = lobbies.doc(lobbyId)
        document.delete()
        console.log('Lobby: ${lobbyId} deleted succesfully') 
    } catch(error) {
        console.error('Error deleting ${lobbyId}:', error)
    }
}

module.exports = { createLobby, deleteLobby }
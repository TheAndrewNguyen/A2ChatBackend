
const { generateCode } = require('./utils/generateCode')

var admin = require("firebase-admin");

var serviceAccount = require("./google-services.json");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let db; //global variable to connection to DB 
connectToFireStore() 

async function connectToFireStore() {
    console.log("Attemping to connect to Firestore...")
    try {
        db = getFirestore() 
        console.log("Connection to Firestore succesful")
    } catch(error) {
        console.error("Error connecting to Firestore,", error) 
    } 
}


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

async function createLobby(lobbyCode) {
    if(!db) {
        console.error("Firestore instance is not initialized")
    } 

    try {
        let lobbies =  db.collection('lobbies')
        await lobbies.doc(lobbyCode).set(documentSchema(lobbyCode))
        console.log("lobby created succesfully")
    } catch(error) {
        console.error("Error while creatting lobby:", error)
    }
}


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


const {generateCode} = require('../services/codeGenerationService')
const firestoreServices = require('../services/firestoreService') 

//TODO: add more specific error codes 
const createLobby = async (req, res) => {
    try {
        const generated_code = await generateCode()
        const lobbyCode = await firestoreServices.createLobby(generated_code)

        res.status(200).json({"code" : lobbyCode})
                
    } catch (error) {
        console.error(`Error during api call: /firestore/createLobby: ${error.message}`)
        res.status(500).json( {"error" : "Failed to create Lobby"})
    }
}

const deleteLobby = async (req, res) => {
    try {
        const { lobbyId } = req.body; // Getting lobbyId from route parameters
        await firestoreServices.deleteLobby(lobbyId);
        
        res.status(200).json({
            "message": `Lobby ${lobbyId} deleted successfully`
        })
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while deleting the lobby' });
    }
}


module.exports = {createLobby, deleteLobby}
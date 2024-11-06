
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
    const { lobbyId } = req.body; // Getting lobbyId from route parameters

    try {
        await firestoreServices.deleteLobby(lobbyId);
        
        res.status(200).json({
            "message": `Lobby ${lobbyId} deleted successfully`
        })
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while deleting the lobby' });
    }
}

const addUserToLobby = async(req, res) => {
    const { lobbyID, UID } = req.body

    try{
        await firestoreServices.addUserToLobby(lobbyID, UID)
        
        res.status(200).json({
            "message": `user ${UID} added succesffuly to lobby ${lobbyID}`
        }
        )
        
    } catch(error) {
        console.error(`Failed to add user ${UID} from lobby ${lobbyID}: ${error.message}`)
        res.status(500).json( {"error" : `Failed to add user ${UID} from lobby ${lobbyID}`})
    }
}

const removeUsersFromLobby = async(req, res) => {
    const {lobbyID, UID} = req.body

    try {
        const result = await firestoreServices.removeUserFromLobby(lobbyID, UID)
        if(result.success) {
            res.status(200).json({"message" : result.message })
        }

    } catch(error) {
        console.error(`Error while trying to remove user ${UID} from lobby {lobbyID}`)
        res.status(500).json({"error" : `Failed to remove user ${UID} from lobby ${lobbyID}`})
    }
}

module.exports = {createLobby, deleteLobby, addUserToLobby, removeUsersFromLobby}
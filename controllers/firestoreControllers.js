
const {generateCode} = require('../services/codeGenerationService')
const firestoreServices = require('../services/firestoreService') 

const createLobby = async (req, res) => {
    try {
        let lobbyCode = await generateCode()
        await firestoreServices.createLobby(lobbyCode)

        const response = {
            "code" : lobbyCode 
        }

        res.status(200).json(response)
                
    } catch (error) {
        const errorResponse = {
            "error" : "Failed to create Lobby"
        }

        res.status(400).json(errorResponse)
        console.error(`Error during api call: /firestore/createLobby ${error}`)
    }
}

module.exports = {createLobby}
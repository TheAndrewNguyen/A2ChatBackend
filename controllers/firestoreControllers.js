
const {generateCode} = require('../services/codeGenerationService')
const firestoreServices = require('../services/firestoreService') 

const createLobby = async (req, res) => {
    try {
        const generated_code = await generateCode()
        const lobbyCode =  firestoreServices.createLobby(generated_code)

        res.status(200).json({"code" : lobbyCode})
                
    } catch (error) {
        console.error(`Error during api call: /firestore/createLobby: ${error.message}`)
        res.status(400).json( {"error" : "Failed to create Lobby"})
    }
}

const deleteLobby = async (req, res) => {
    try {
        const {lobbyId} = req.body() 

    }
    catch(error) {
        console.error(`Erro rdudr`)
    }
}

module.exports = {createLobby, deleteLobby}

const userBatchService = require('../services/userBatchServices') 

const userBatchEndChat = async(req, res) => {
    const {lobbyId, uid} = req.params
    
    try {
        await userBatchService.batchUserEndChat(lobbyId, uid) 
        res.status(200).json({message: `succesfully ended chat for lobby: ${lobbyId}, user ${uid}`})
    } catch (error) {
        res.status(500).json({error: `An error occured while ending chat for lobby: ${lobbyId}, user ${uid}`})
    }
}

module.exports = {
    userBatchEndChat
}

const { generateCode } = require('../utils/misc/generateCode')
const { createLobby, deleteLobby, addUserToLobby} = require('../utils/Firebase/firestoreUtils')

const express = require('express')
const router = express.Router();

//creates firestore documenet returns the join code to the user
router.post('/createLobby', (req, res) =>{
    let code = generateCode() 
    createLobby(code) //creates a lobby with the join code
        .then(() => {
            res.status(201).send( {code} )
        }) 
        .catch(error => {
            res.status(500).send({ error: `Failed to create lobby error: ${error}`})
        })
})

router.delete('/deleteLobby', async (req, res) => {
    const { lobbyId } = req.body; // Getting lobbyId from route parameters

    // Input validation (simple example)
    if (!lobbyId || typeof lobbyId !== 'string') {
        return res.status(400).json({ message: 'Invalid lobbyId' });
    }

    try {
        const result = await deleteLobby(lobbyId);

        if (result.success == true) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(404).json({ message: result.message });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while deleting the lobby' });
    }
})


router.put('/addUserToLobby', async(req, res) => {
    const { lobbyID, UID } = req.body
    try {
        const result = await addUserToLobby(lobbyId, UID)

        if(result.success) {
            return res.status(200).json({message : result.message})
        } else {
            console.error(result.message)
            return res.status(404).json({ message : result.message})
        }
    } catch(error) {
        console.error(error) 
        return res.status(500).json({ message : 'An error occurred while updating the lobby'})
    }
})

module.exports = router

const { generateCode } = require('../utils/misc/generateCode')
const { createLobby, deleteLobby } = require('../utils/Firebase/firestoreUtils')

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
        const success = await deleteLobby(lobbyId);

        if (success) {
            return res.status(200).json({ message: 'Lobby deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Lobby not found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while deleting the lobby' });
    }
});

module.exports = router
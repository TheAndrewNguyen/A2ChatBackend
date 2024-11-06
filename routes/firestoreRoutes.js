
const { createLobby, deleteLobby, addUserToLobby, removeUserFromLobby } = require('../services/firestoreService')
const firestoreController = require('../controllers/firestoreControllers')

const express = require('express')
const router = express.Router();

//creates firestore documenet returns the join code to the user
router.post('/createLobby', firestoreController.createLobby) 

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
        const result = await addUserToLobby(lobbyID, UID)

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

router.delete('/removeUsersFromLobby', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body for debugging
    const { lobbyID } = req.body;
    try {
        const result = await removeUserFromLobby(lobbyID);

        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            console.error(result.message);
            return res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the lobby' });
    }
});



module.exports = router
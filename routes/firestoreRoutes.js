
const {removeUserFromLobby } = require('../services/firestoreService')
const firestoreController = require('../controllers/firestoreControllers')

const express = require('express')
const router = express.Router();

//creates firestore documenet returns the join code to the user
router.post('/createLobby', firestoreController.createLobby) 
router.delete('/deleteLobby', firestoreController.deleteLobby) 
router.put('/addUserToLobby', firestoreController.addUserToLobby)

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
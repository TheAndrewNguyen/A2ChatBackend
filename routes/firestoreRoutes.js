
const firestoreController = require('../controllers/firestoreControllers')

const express = require('express')
const router = express.Router();


// /firestore/
router.post('/createLobby', firestoreController.createLobby) 
router.delete('/deleteLobby', firestoreController.deleteLobby) 
router.put('/addUserToLobby', firestoreController.addUserToLobby)
router.delete('/removeUsersFromLobby', firestoreController.removeUsersFromLobby)

module.exports = router
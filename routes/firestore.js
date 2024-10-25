
const { generateCode } = require('../utils/misc/generateCode')
const { createLobby, deleteLobby } = require('../utils/Firebase/firestoreUtils')

const express = require('express')
const router = express.Router();

//creates firestore documenet returns the join code to the user
router.get('/createLobby', (req, res) =>{
    let code = generateCode() 
    createLobby(code) //creates a lobby with the join code 
    
    res.send(code)
})

module.exports = router
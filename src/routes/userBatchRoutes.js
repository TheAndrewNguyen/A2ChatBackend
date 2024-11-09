
const express = require('express')
const router = express.Router();
const userBatchController = require('../controllers/userBatchController')

router.delete('/endChat/:lobbyId/:uid', userBatchController.userBatchEndChat) 

module.exports = router
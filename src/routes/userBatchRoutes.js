
const express = require('express')
const router = express.Router();
const userBatchController = require('../controllers/userBatchController')
const middleware = require('../middleware/verifyUser')

router.delete('/endChat/:lobbyId/:uid', middleware.verifyUser, userBatchController.userBatchEndChat) 

module.exports = router
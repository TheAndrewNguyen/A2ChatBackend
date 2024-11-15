
const express = require('express')
const router = express.Router();
const userBatchController = require('../controllers/userBatchController')
const middleware = require('../middleware/verifyUser')
const middleware2 = require('../middleware/rateLimit')

router.delete('/endChat/:lobbyId/:uid', middleware.verifyUser, middleware2.standardlimiter, userBatchController.userBatchEndChat) 

module.exports = router
const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageControllers')
const middleware = require('../middleware/verifyUser')
const middleware2 = require('../middleware/rateLimit')

/**
 * @route POST /messages/:lobbyCode
 * @desc Send message to specified lobby id with message, timestamp, and user
 * @access PUBLIC
 */
 router.post("/:lobbyCode", middleware.verifyUser, middleware2.msglimiter, messageController.handleSendMessage);

 /**
 * @route GET /messages/:lobbyCode
 * @desc Get all messages from specified lobby id
 * @access PUBLIC
 */
router.get("/:lobbyCode", middleware.verifyUser, middleware2.standardlimiter, messageController.handleGetMessage);

 module.exports = router;
const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageControllers')

/**
 * @route POST /messages/:lobbyCode
 * @desc Send message to specified lobby id with message, timestamp, and user
 * @access PUBLIC
 */
 router.post("/:lobbyCode", messageController.handleSendMessage);

 module.exports = router;
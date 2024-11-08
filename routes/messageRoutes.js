const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageControllers')

/**
 * @route POST /messages/:lobbyCode
 * @desc Send message to specified lobby id with message, timestamp, and user
 * @access PUBLIC
 */
 router.post("/:lobbyCode", messageController.handleSendMessage);

 /**
 * @route GET /messages/:lobbyCode
 * @desc Get all messages from specified lobby id
 * @access PUBLIC
 */
router.get("/:lobbyCode", messageController.handleGetMessage);

 module.exports = router;
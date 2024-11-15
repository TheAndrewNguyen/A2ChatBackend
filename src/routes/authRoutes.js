

const express = require('express')
const router = express.Router();
const authController = require("../controllers/authControllers")
const middleware = require('../middleware/verifyUser')
const middleware2 = require('../middleware/rateLimit')

// Endpoint to delete a user
router.delete('/deleteUser/:uid', middleware.verifyUser, middleware2.standardlimiter, authController.deleteUser)

// Endpoint to verify user
router.post('/verifyToken', middleware.verifyUser, middleware2.standardlimiter, authController.verifyToken)

module.exports = router

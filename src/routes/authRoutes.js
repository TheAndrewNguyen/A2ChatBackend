

const express = require('express')
const router = express.Router();
const authController = require("../controllers/authControllers")
const middleware = require('../middleware/verifyUser')

// Endpoint to delete a user
router.delete('/deleteUser/:uid', middleware.verifyUser, authController.deleteUser)

// Endpoint to verify user
router.post('/verifyToken', middleware.verifyUser, authController.verifyToken)

module.exports = router

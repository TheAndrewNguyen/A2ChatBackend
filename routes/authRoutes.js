

const express = require('express')
const router = express.Router();
const authController = require('../controllers/authControllers')

// Endpoint to delete a user
router.delete('/deleteUser/:uid', authController.deleteUser)

module.exports = router

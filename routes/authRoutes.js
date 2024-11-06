
const admin = require('../configs/firebaseConfig.js')
const { checkAuthConnection } = require('../services/authServices.js');

const express = require('express')
const router = express.Router();

// Endpoint to delete a user
router.delete('/deleteUser', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ message: 'UID is required.' }); // Check for UID
    }

    console.log('Attempting to delete user:', uid, ' called')

    try {
        await admin.auth().deleteUser(uid); // Using admin.auth() directly
        console.log(`Successfully deleted user: ${uid}`);
        res.status(200).json({
            message: `Successfully deleted user: ${uid}`
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }     
});

module.exports = router
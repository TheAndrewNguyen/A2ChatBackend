
const admin = require('../configs/firebaseConfig.js')
const { getAuth } = require('firebase-admin/auth');
const { checkAuthConnection } = require('../utils/Firebase/authUtils');

const express = require('express')
const router = express.Router();


// Route to check Firebase Auth connection
router.get('/CheckConnection', async (req, res) => {
    const result = await checkAuthConnection();

    if (result.success) {
        console.log('Successfully connected to Firebase Auth.');
        res.status(200).json({
            message: 'Firebase Authentication is connected!',
            userCount: result.userCount,
            users: result.users
        });
    } else {
        console.log('Error connecting to Firebase Auth:');
        res.status(500).json({
            message: 'Error connecting to Firebase Authentication.',
            error: result.error
        });
    }
});

// Endpoint to delete a user
router.delete('/deleteUser', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ message: 'UID is required.' }); // Check for UID
    }

    console.log('Attempting to delete user: ${uid} called')

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
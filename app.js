const express = require('express');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { checkAuthConnection } = require('./utils/Firebase/authUtils');
const { generateCode } = require('./utils/misc/generateCode')

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send("A2 Server is up!")
})

// Route to test the connection
app.get('/test', (req, res) => {
    res.send('Hello A2222!!!!!!');
});

// Create 6-digit code
app.get('/getCode', (req, res) => {
    let code = generateCode() 
    
    console.log(code); 
    res.json(code);
});

// Route to check Firebase Auth connection
app.get('/auth/CheckConnection', async (req, res) => {
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
app.delete('/auth/deleteUser', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({ message: 'UID is required.' }); // Check for UID
    }

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


// Start the server
app.listen(port, () => {
    console.log(`App running listening on port ${port}`);
});

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const verifyUser = async (req, res, next) => {
    // Extract token from the Authorization header
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    console.log('Extracted token:', idToken);  // Log the token to check if it's being passed correctly

    if (!idToken) {
        return res.status(403).send('Authorization token is missing');
    }

    try {
        // Verify the token and get the decoded token object
        const decodedToken = await getAuth().verifyIdToken(idToken);
        const uid = decodedToken.uid; // Extract the user ID (UID)
        req.user = { uid }; // Attach the UID to the request object for use in other routes
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).send('Invalid or expired token');
    }
};

module.exports = { verifyUser };

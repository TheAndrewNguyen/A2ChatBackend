const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require('../google-services.json');

let db, realtimeDb;

try { 
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://a2chat-25ae2-default-rtdb.firebaseio.com/'
    });

    db = getFirestore() 
    realtimeDb = admin.database(); // Initialize Realtime Database
    console.log("FirebaseConfig.js: FireStore initalized succesfully")

} catch(error) {
    console.error(`FirebaseConfigs.js: There was an error while initalizing a firebase service ${error}`)
}


module.exports = {admin, db, realtimeDb} 
const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require('../google-services.json');

let db

try { 
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    db = getFirestore() 
    console.log("FirebaseConfig.js: FireStore initalized succesfully")

} catch(error) {
    console.error(`FirebaseConfigs.js: There was an error while initalizing a firebase service ${error}`)
}


module.exports = {admin, db} 
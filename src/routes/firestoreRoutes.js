//import neccesary modules and controllers
const express = require("express");
const router = express.Router();
const firestoreController = require("../controllers/firestoreControllers");
const middleware = require('../middleware/verifyUser');

/**
 * @route POST /firestore/createLobby
 * @desc Create a new lobby with a specified ID returns lobby
 * @access PUBLIC
 */
router.post("/createLobby", middleware.verifyUser, firestoreController.createLobby);

/**
 * @route DELETE /firestore/deleteLobby
 * @desc Removes lobby from firestore db
 * @access PUBLIC
 */
router.delete("/deleteLobby", middleware.verifyUser, firestoreController.deleteLobby);

/**
 * @route DELETE /firestore/addUserToLobby
 * @desc adds user to firestore lobby document
 * @access PUBLIC
 */
router.put("/addUserToLobby", middleware.verifyUser, firestoreController.addUserToLobby);

/**
 * @route DELETE /firestore/removeUsersFromLobby
 * @desc Removes user from lobby or deletes lobby if last user in lobby calls
 * @access PUBLIC
 */
router.delete("/removeUsersFromLobby/:lobbyId/:uid", middleware.verifyUser, firestoreController.removeUsersFromLobby
);

//export router to app.js
module.exports = router;

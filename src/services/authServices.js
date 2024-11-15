
const admin = require('../../configs/firebaseConfig')
const { getAuth } = require('firebase-admin/auth');

//returns the first 10 users if firebase is working 
//if no users show up then firebase is not working 
const getFirst10FirebaseAuthUsers = async () => {
    try {
        const auth = admin.auth();
        const listUsersResult = await auth.listUsers(10);
        return {
            success: true,
            userCount: listUsersResult.users.length,
            users: listUsersResult.users.map(user => ({ uid: user.uid }))
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

//check if the user passed in is inside of the auth directory  
async function authCheckIfUserExists(UID) {
    console.log(`Attemping to find user ${UID}...`)

    try {
        await getAuth().getUser(UID)
        console.log(`User: ${UID} succesfully found! `)
        return true 
    } catch(error) {
        console.error(`Error while trying to find the user: ${UID} ${error}`)
        throw new Error(`Error while trying to find user ${UID}: ${error.message}`)
    }
}

//delete the user from firebase auth 
async function authDeleteUser(UID) {
    console.log('Attempting to delete user:', UID + '...')
    try {
        if(!UID) {
            throw new Error("Must provide UID")
        }

        await authCheckIfUserExists(UID)
        await getAuth().deleteUser(UID); 
            
        console.log(`Successfully deleted user: ${UID}`);
        return {success : true, message : `Successfully deleted user: ${UID}`}
    } catch(error) {
        return {success: false, message: `${error.message}`}
    }
}


module.exports = {
    getFirst10FirebaseAuthUsers,
    authCheckIfUserExists, 
    authDeleteUser
};

async function deleteAllUsers() {
    let nextPageToken; // Token for paging through users
    do {
        const listUsersResult = await getAuth().listUsers(1000, nextPageToken);

        // Loop through each user and delete them
        for (const user of listUsersResult.users) {
            const result = await authDeleteUser(user.uid);
            if (!result.success) {
                console.error(`Failed to delete user ${user.uid}: ${result.message}`);
            }
        }

        nextPageToken = listUsersResult.pageToken; // Update token for the next page
    } while (nextPageToken); // Continue if there are more users

    console.log("All users deleted.");
}


const { getAuth } = require('firebase-admin/auth');
const admin = require('../configs/firebaseConfig')

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

    await getAuth()
        .getUser(UID)
        .then(() =>{
            console.log(`User: ${UID} succesfully found! `)
            return true 
        })
        .catch((error) => {
            console.error(`Error while trying to find the user: ${UID} ${error}`)
        })
}

module.exports = {
    getFirst10FirebaseAuthUsers,
    authCheckIfUserExists
};

//Developer section
/*-----------------------------------------------------*/ 
async function test() {
    await authCheckIfUserExists("R17FpKNLx3QGzT6T3ZliNLRfFe2")
}

test()
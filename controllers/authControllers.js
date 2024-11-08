

const authServices = require('../services/authServices')

const deleteUser = async(req, res) => {
    const {uid} = req.params

    try {
        const result = await authServices.authDeleteUser(uid)
        if(result.success) {
            res.status(200).json({"message": `user ${uid} was succesfully deleted`})
        } else {
            throw new Error(result.message)
        }
    } catch(error) {
        console.error(`An error occured while deleting user ${uid} from auth databse: ${error}`)
        res.status(500).json( { "message": `An error occured while deleting user ${uid} from auth database`})
    }
}

module.exports = {
    deleteUser
}
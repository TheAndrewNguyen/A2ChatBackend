

const authServices = require('../services/authServices')

const deleteUser = async(req, res) => {
    const {UID} = req.body

    try {
        const result = await authServices.authDeleteUser(UID)
        if(result.success) {
            res.status(200).json({"message": `user ${UID} was succesfully deleted`})
        } else {
            throw new Error(result.message)
        }
    } catch(error) {
        console.error(`An error occured while deleting user ${UID} from auth databse: ${error}`)
        res.status(500).json( { "message": `An error occured while deleting user ${UID} from auth database`})
    }
}

module.exports = {
    deleteUser
}
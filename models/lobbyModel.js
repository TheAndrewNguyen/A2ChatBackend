
//Schema for firestore document 
function documentSchema(lobbyCode) {    
    const schema = {
        isActive: true,
        lobbyCode: lobbyCode,
        users: []
    };

    return schema;
}

module.exports = {
    documentSchema
}
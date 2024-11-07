
//Schema for realtime document 
function messageSchema() {    
    const schema = {
        message: "",
        userId: "",
        timestamp: new Date().toISOString(),
    };

    return schema;
}

module.exports = {
    messageSchema
}


function generateCode() {
    const chars = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ];
      
    let code = ""
    
    for(let i = 0; i < 6; i++) {
        let randomNum = Math.floor(Math.random() * 10)
        let random_char = chars[randomNum]
        code += random_char
    }

    return code 
}

module.exports = { generateCode }
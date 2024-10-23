
const express = require('express') 
const app = express() 
const port = 3000 

app.get('/test', (req, res) => {
    res.send('Hello A2222!!!!!!')
})

//create 6 digit code 
app.get('/getCode', (req, res) => {
    const chars = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ];
      
    let code = []
    
    for(let i = 0; i < 6; i++) {
        let randomNum = Math.floor(Math.random() * 35)
        let random_char = chars[randomNum]
        code[i] = random_char
    }
    console.log(code) 
    res.json(code)
})

app.listen(port, () => {
    console.log(`App running listening on port ${port}`)
})


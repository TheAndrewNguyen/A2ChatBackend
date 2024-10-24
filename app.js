const express = require('express') 
const app = express() 
const port = 3000 

const { generateCode } = require('./utils/generateCode')

app.get('/test', (req, res) => {
    res.send('Hello A2222!!!!!!')
})



//create 6 digit code 
app.get('/getCode', (req, res) => {
    code = generateCode() 
    res.send(code)
})


app.listen(port, () => {
    console.log(`App running listening on port ${port}`)
})



const express = require('express') 
const app = express() 
const port = 3000 

app.get('/test', (req, res) => {
    res.send('Hello A2222!!!!!!')
})

app.listen(port, () => {
    console.log(`App running listening on port ${port}`)
})



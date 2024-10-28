
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send("A2 Server is up!")
})


//importing route files 
const authRouter = require('./routes/auth.js')
const test = require('./routes/test.js')
const firestore = require('./routes/firestore.js')

//use the routers 
app.use('/auth', authRouter)
app.use('/test', test)
app.use('/firestore', firestore)


// Start the server
app.listen(port, () => {
    console.log(`App running listening on port ${port}`);
});

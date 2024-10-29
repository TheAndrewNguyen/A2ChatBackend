const { getData } = require('./utils/misc/monitoringInterface.js')

//server set up
const express = require('express');
const app = express();
const port = 3000;

//sets and use 
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json()); // Middleware to parse JSON bodies

//importing route files 
const authRouter = require('./routes/auth.js')
const test = require('./routes/test.js')
const firestore = require('./routes/firestore.js')

//use the routers 
app.use('/auth', authRouter)
app.use('/test', test)
app.use('/firestore', firestore)

//root page 
app.get('/', (req, res) => {
    res.render('index', getData())
})

// Start the server
app.listen(port, () => {
    console.log(`App running listening on port ${port}`);
});

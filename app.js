const { getData } = require('./utils/osUtils.js')

//server set up
const express = require('express');
const app = express();
const port = 3000;

//sets and use 
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json()); // Middleware to parse JSON bodies

//importing route files 
const authRouter = require('./routes/authRoutes.js')
const firestore = require('./routes/firestoreRoutes.js')
const systemData = require('./routes/systemDataRoutes.js')
const messages = require('./routes/messageRoutes.js')

//use the routers 
app.use('/auth', authRouter)
app.use('/firestore', firestore)
app.use('/systemData', systemData)
app.use('/messages', messages)

//root page 
app.get('/', async(req, res) => {
    let data = await getData()
    console.log(data)
    res.render('index', data)
})

// Start the server
app.listen(port, () => {
    console.log(`App running listening on port ${port}`);
});

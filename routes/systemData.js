
const { getData } = require('../utils/misc/monitoringInterface.js')
const express = require('express')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let data = await getData()
        res.send(data)  
    } catch(e) {
        console.error('error fetching data: ', e)
    }
})

module.exports = router

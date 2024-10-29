
const { getData } = require('../utils/misc/monitoringInterface.js')
const express = require('express');
const { fstat } = require('node:fs');
const path = require('node:path');
const fs = require('fs') 

const router = express.Router();

router.get('/getData', async (req, res) => {
    try {
        let data = await getData()
        res.send(data)  
    } catch(e) {
        console.error('error fetching data: ', e)
    }
})

//reads log files
router.get('/logs', (req, res) => {
    let filePath = path.join(__dirname, '/home/ubuntu/.pm2/logs/app-out.log')
    fs.readFile(filePath, 'utf-8', (data) =>{
        res.setHeader('LogFile', 'text/plain')
        res.send(<pre>${data}</pre>)
    })
})

module.exports = router

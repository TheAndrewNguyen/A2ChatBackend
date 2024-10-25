
const { generateCode } = require('../utils/misc/generateCode')

const express = require('express')
const router = express.Router();

// Create 6-digit code
router.get('/getCode', (req, res) => {
    let code = generateCode() 
    
    console.log(code); 
    res.json(code);
});

module.exports = router
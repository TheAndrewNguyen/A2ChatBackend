

const osUtils = require('../utils/osUtils.js')
const express = require('express');
const { fstat, symlinkSync } = require('node:fs');
const path = require('node:path');
const fs = require('fs') 

const router = express.Router();
const systemDataController = require('../controllers/systemDataController')

router.get('/getData', systemDataController.getData)

//reads log files
router.get('/log', systemDataController.log);


//error log file
router.get('/errorLog', systemDataController.errorLog)


module.exports = router

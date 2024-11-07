
const osUtils = require('../utils/osUtils.js')
const express = require('express');
const { fstat } = require('node:fs');
const path = require('node:path');
const fs = require('fs') 

const getData = async(req,res) => {
    try {
        let data = await osUtils.getData()
        res.send(data)  
    } catch(error) {
        console.error('error fetching data: ', error)
        res.send("Error fetching data")
    }
}

const log = async(req, res) => {
    try {
        let filePath = path.join('/home/ubuntu/.pm2/logs/app-out.log')
        fs.readFile(filePath, 'utf-8', (err, data) =>{
            if(err) {
                console.error('Error reading log file:', err);
                return res.status(500).send('Error reading log file');    
            }

            res.setHeader('Content-Type', 'text/plain')
            res.send(data)
        })
    } catch(error) {
        console.error("Error while retreiving log file " + error)
        res.send(500).send('Error while retreiving log file')
    }
}

const errorLog = async(req, res) => {
    let filePath = path.join('/home/ubuntu/.pm2/logs/app-error.log')
    fs.readFile(filePath, 'utf-8', (err, data) =>{
        if(err) {
            console.error('Error reading log file:', err);
            return res.status(500).send('Error reading log file');    
        }

        res.setHeader('Content-Type', 'text/plain')
        res.send(data)
    })
}

module.exports = {
    getData, 
    log, 
    errorLog
}
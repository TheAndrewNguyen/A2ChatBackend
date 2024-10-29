

//OS utils for frontend monitoring 

const os = require('node:os')

//function that calculates os uptime f
function osUptime() {
    let secondsUp = os.uptime()

    let days = 0
    let hours = 0
    let minutes = 0 

    days = Math.max(Math.floor(secondsUp / 86400), days)
    secondsUp -= days * 86400

    hours = Math.max(Math.floor(secondsUp / 3600), hours) 
    secondsUp -= hours * 3600
    
    minutes = Math.max(Math.floor(secondsUp / 60), minutes)

    let upTimeToString = `Uptime: ${days} days, ${hours} hours, ${minutes} minutes`

    return upTimeToString
}

function cpuStats() {
    
}

function memoryStats() {
    let freemem = os.freemem() 
    let totalmem = os.totalmem() 

    let memoryPercentage = freemem / totalmem * 100
    memoryPercentage = memoryPercentage.toFixed(2) 

    let freememGb = freemem / (1024 * 1024 * 1024)
    freememGb = freememGb.toFixed(2) 
    return `Percent memory currently using: ${memoryPercentage}% (free memory: ${freememGb}gb)`
}

function getData() {
    let data = { 
        uptime: osUptime(), 
        memoryStats: memoryStats()
    }
    return data
}

console.log(getData())

module.exports = {getData}

 


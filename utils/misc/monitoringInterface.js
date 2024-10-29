

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


function memoryStats() {
    let totalmem = os.totalmem() 
    let freemem =  os.freemem()

    let memoryPercentage = (totalmem - freemem) / totalmem * 100
    memoryPercentage = memoryPercentage.toFixed(2) 

    let freememGb = freemem / (1024 ** 3)
    freememGb = freememGb.toFixed(2) 

    return `Ram usage: ${memoryPercentage}% (free: ${freememGb}gb)`
}

async function cpuUsage() {
    const startTimes = os.cpus()

    const timeoutPromise =  new Promise((resolve) =>
        setTimeout(() => {
            const endTimes = os.cpus()
            let idleDiff = 0
            let totalDiff = 0

            for(let i = 0; i < startTimes.length; i++) {
                const start = startTimes[i].times;
                const end = endTimes[i].times; 

                idleDiff += end.idle - start.idle
                
                const total = Object.values(end).reduce((a,b) => a + b) - 
                            Object.values(start).reduce((a,b) => a + b)
                
                totalDiff += total; 
            }

        const cpuPercentage = ((totalDiff - idleDiff) /totalDiff) * 100
        resolve(`Cpu usage: ${cpuPercentage.toFixed(2)}%`)
        }, 1000)
    )

    const result = await timeoutPromise
    return result
}

async function getData() {
    let data = { 
        uptime: osUptime(),
        memoryStats: memoryStats(),
        cpuUsage: await cpuUsage()
    }
    return data
}


module.exports = {getData}

 




//OS utils for frontend monitoring 

const os = require('node:os')

//function that calculates os uptime f
async function osUptime() {
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


function send_data() {
    let data = { uptime: osUptime() }
    return data
}

console.log(send_data())


 


const client = require('..')
const chalk = require('chalk')


client.on("ready", () => {
    const activites = [
        { name: `${client.guilds.cache.size} Servers`, type: 2 },
        { name: `${client.channels.cache.size} channels`, type: 0 },
        { name: `${client.users.cache.size} Users`, type: 3 }
    ]
    let i = 0;
    setInterval(() => {
        if(i >= activites.length) i = 0
        client.user.setActivity(activites[i])
        i++;
    }, 10000)
    console.log(chalk.red("############################################################################"))
    console.log(chalk.red(`#                  Logged in as ${client.user.tag}                         #`))
    console.log(chalk.red("############################################################################"))
})

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
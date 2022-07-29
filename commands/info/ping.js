module.exports = {
    name: 'ping',
    description: "Check Bot'S Ping.",
    userPerms: [],
    botPerms: [],
    run: async (client, message, args) => {
        const msg = await message.reply('Pinging...')
        await msg.edit(`Pong! **${client.ws.ping} ms**`)
    }
};

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
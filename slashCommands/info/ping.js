const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Check the Bot's Ping",
    type: ApplicationCommandType.ChatInput,
    default_permissions: [],
    default_member_permissions: [],
    run: async (client, interaction) => {
        interaction.reply({ content: `Pong! Latency: **${Math.round(client.ws.ping)} ms**`})
    }
};

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
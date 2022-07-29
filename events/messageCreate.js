const client = require('..')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const prefix = client.prefix;

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(message.channel.type !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) {
        if(command.userPerms || command.botPerms) {
            if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                const userPerms = new EmbedBuilder()
                .setDescription(`❌ ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
                .setColor('Red');
                return message.reply({ embeds: [userPerms] })
            }
            if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                const botPerms = new EmbedBuilder()
                .setDescription(`❌ ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
                .setColor('Red');
                return message.reply({ embeds: [botPerms] })
            }
        }
        command.run(client, message, args)
    }
});

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
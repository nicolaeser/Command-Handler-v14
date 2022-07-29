const client = require('..')
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

client.on('interactionCreate', async interaction => {
const slashCommand = client.slashCommands.get(interaction.commandName);
if(interaction.type == 4) {
    if(slashCommand.autocomplete) {
        const choices = [];
        await slashCommand.autocomplete(interaction.choices)
    }
}
if(!interaction.type == 2) return;

if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
try {
if(slashCommand.userPerms || slashCommand.botPerms) {
    if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
        const userPerms = new EmbedBuilder()
        .setDescription(`❌ ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this Command!`)
        .setColor('Red');
        return interaction.reply({ embeds: [userPerms] })
    }
    if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))){
        const botPerms = new EmbedBuilder()
        .setDescription(`❌ ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
        .setColor('Red');
        return interaction.reply({ embeds: [botPerms] })
    }
}
await slashCommand.run(client, interaction);
} catch (error) {
    console.log(error);
}
});

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
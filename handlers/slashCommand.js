const fs = require('fs');
const chalk = require('chalk');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Command Handler Slash Commands', 'Stats').setBorder('#', '#', '#', '#')

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

module.exports = (client) => {
    const slashCommands = [];

    fs.readdirSync('./slashCommands/').forEach(async dir => {
        const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

        for(const file of files) {
            const slashCommand = require(`../slashCommands/${dir}/${file}`);
            slashCommands.push({
                name: slashCommand.name,
                name_localizations: slashCommand.name_localizations ? slashCommand.name_localizations : null,
                description: slashCommand.description,
                description_localizations: description_localizations ? slashCommand.description_localizations : null,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
                });

                if(slashCommand.name) {
                    client.slashCommands.set(slashCommand.name, slashCommand)
                    table.addRow(file.split('.js')[0], '✅')
                } else {
                    table.addData(file.split('.js')[0], '❌')
                }
        }
    });
    console.log(chalk.red(table.toString()));
    
    (async () => {
        try {
            await rest.put(
                process.env.GUILD_ID ?
                Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) :
                Routes.applicationCommands(CLIENT_ID),
                { body: slashCommands }
            );
            console.log(chalk.yellow('Slash Commands Registered.'))
        } catch (error) {
            console.log(error);
        }
    })();
};

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/
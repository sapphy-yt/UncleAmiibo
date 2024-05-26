const Discord = require('discord.js');
const { Client, IntentsBitField } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.commands = new Discord.Collection();

const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (let file of cmdFiles) {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.name, cmd);
}

client.once('ready', () => {
    console.log("hai :3");
});

client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'ping') {
        interaction.reply('pong');
    } else if (interaction.commandName === 'techinfo') {
        client.commands.get('techinfo').execute(interaction);
    };
});

client.login(process.env.TOKEN);
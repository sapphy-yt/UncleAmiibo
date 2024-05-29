const { Player } = require('discord-player');
const { Client, IntentsBitField, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.commands = new Collection();

const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (let file of cmdFiles) {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.name, cmd);
}

client.once('ready', () => {
    console.log("hai :3");
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('pong');
    } else if (interaction.commandName === 'techinfo') {
        client.commands.get('techinfo').execute(interaction);
    } else if (interaction.commandName === 'techupdate') {
        const allowedRoles = ['1244729048987603035', '1243650269900705882']; //1st is Amiibo Helper, 2nd Supreme Overlords
        const memberRoles = interaction.member.roles.cache;
        const hasRole = allowedRoles.some(role => memberRoles.has(role))

        if (hasRole) {
            console.log("at techupdate")
            client.commands.get('techupdate').execute(interaction);
        } else {
            let imageID = Math.floor(Math.random() * 2)
            let imageURI
            switch (imageID) {
                case 0: imageURI = './data/no_perms.gif'; break;
                case 1: imageURI = './data/no_perms.jpg'; break
            }
            interaction.reply({ files: [{ attachment: imageURI }] })
        }
    } else if (interaction.commandName === 'techall') {
        client.commands.get('techall').execute(interaction);
    } else if (interaction.commandName === 'play') {
        let user = client.guilds.cache.get('1243643481247715458').members.cache.get(interaction.member.id);

        if (user.voice.channel) { 
            client.commands.get('play').execute(client, interaction);
        } else {
            interaction.reply('maybe get your ass in vc bucko');
            return;
        };
    } else if (interaction.commandName === 'skip') {
        client.commands.get('skip').execute(client, interaction);
    } else if (interaction.commandName === 'resume') {
        client.commands.get('resume').execute(client, interaction);
    } else if (interaction.commandName === 'pause') {
        client.commands.get('pause').execute(client, interaction);
    } else if (interaction.commandName === 'queue') {
        client.commands.get('queue').execute(client, interaction);
    } else if (interaction.commandName === 'exit') {
        client.commands.get('exit').execute(client, interaction);
    }
});

client.login(process.env.TOKEN);
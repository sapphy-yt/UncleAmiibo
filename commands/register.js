const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'ping',
        description: 'test if the bot even works lmao',
    },
    {
        name: 'techinfo',
        description: 'gives information about a movement technique',
        options: [
            {
                name: 'technique',
                description: 'the technique you want info about',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ],
    },
    {
        name: 'techupdate',
        description: 'allows updating and adding of commands for techinfo',
        options: [
            {
                name: 'abbreviation',
                description: 'the abbreviation you want to add or edit (put the name of the technique if it has none)',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'technique',
                description: 'the full name of the technique',
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'description',
                description: 'the description of the technique',
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'hasabbreviation',
                description: 'Werther the Technique has an abbreviation, relevant for Moon Clip',
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }
        ]
    },
    {
        name: 'techall',
        description: 'shows all techniques currently saved in the bot'
    },
    {
        name: 'play',
        description: 'puts a song in the music queue',
        options: [
            {
                name: 'song_name',
                description: 'the song you want to play',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ],
    },
    {
        name: 'exit',
        description: 'makes the bot exit the music channel'
    },
    {
        name: 'pause',
        description: 'pauses the music'
    },
    {
        name: 'queue',
        description: 'views the song queue'
    },
    {
        name: 'resume',
        description: 'resumes the music'
    },
    {
        name: 'skip',
        description: 'skips the current song'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        
        console.log('done');
    } catch (error) {
        console.log('oopsie i fucked up :3');
        console.log(error);
    }
})();
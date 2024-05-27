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
                choices: [
                    {
                        name: 'Cap Bounce Vector',
                        value: 'cbv',
                    },
                    {
                        name: 'Motion Control Cap Throw',
                        value: 'mcct',
                    },
                    {
                        name: 'Moon Clip',
                        value: 'moon clip',
                    },
                    {
                        name: 'Roll Cancel',
                        value: 'rc',
                    },
                    {
                        name: 'Triple Throw',
                        value: 'tt',
                    },
                ],
                required: true,
            }
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('done');
    } catch (error) {
        console.log('oopsie i fucked up :3');
        console.log(error);
    }
})();
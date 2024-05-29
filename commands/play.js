const { QueryType, Player } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',

    execute: async ({ client, interaction }) => {
        client.player = new Player(client, {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        });        

        let queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let url = interaction.options.getString('song_link');
        let result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_VIDEO,
        });

        if (result.tracks.length = 0) {
            await interaction.reply('wtf man this shit doesnt exist');
            return;
        }

        let song = result.tracks[0]
        await queue.addTrack(song);

        let goofyGreyBox = new EmbedBuilder()
            .setTitle('Song Added to Queue')
            .setDescription(`**[${song.title}](${song.url})**`)
            .setThumbnail(song.thumbnail)
            .addFields(
                {
                    name: 'Duration',
                    value: `${song.duration}`
                }
            )
            .setColor(0x3498db);

        interaction.reply({embeds: [goofyGreyBox]});

    }
};
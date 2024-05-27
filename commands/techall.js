const { EmbedBuilder } = require('discord.js');
const techData = require('../data/tech.json');

module.exports = {
    name: 'techall',

    execute(interaction) {
        const embeds = [];
        
        techData.forEach(entry => {
            if (entry.hasAbbreviation === false) {
                entry.abbreviation = "No Abbreviation";
            }

            const techEmbed = new EmbedBuilder()
                .setTitle(entry.name)
                .setDescription(entry.description)
                .addFields({ name: 'Abbreviation', value: entry.abbreviation })
                .setColor(0x3498db);
            
            embeds.push(techEmbed);
        });

        interaction.reply({ embeds: embeds });
    }
};
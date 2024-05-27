const { EmbedBuilder } = require('discord.js');
const techData = require('../data/tech.json');

module.exports = {
    name: 'techinfo',

    execute(interaction) {
        let tech = interaction.options.get('technique').value;

        let techFull = techData.find(entry => entry.abbreviation.toLowerCase() === tech.toLowerCase()); //Gets the matching entry of the JSON file

        let techName = techFull ? techFull.name : null; // If techFull is false (what gets set when techData didn't find anything) sets to null

        let techExplanation = techFull ? techFull.description : null;

        let techHasAbbreviation = techFull ? techFull.hasAbbreviation : null;

        if (techName == null || techExplanation == null || techHasAbbreviation == null) { //Error Handling
            techName = "Technique not found"
            techExplanation = "-"
        };

        if (techHasAbbreviation === false) {
            tech = "No Abbreviation"
        };

        let techEmbed = new EmbedBuilder()
            .setTitle(techName)
            .setDescription(techExplanation)
            .addFields(
                { name: 'Abbreviation', value: tech }
            )
            .setColor(0x3498db);

        interaction.reply({ embeds: [techEmbed] });
    }
}
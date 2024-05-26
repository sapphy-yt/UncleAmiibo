const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'techinfo',

    execute(interaction) {
        let tech = interaction.options.get('technique').value;
        
        let techName;
        if (tech === 'moonclip') {
            techName = 'Moon Clip';
        } else if (tech === 'cbv') {
            techName = 'Cap Bounce Vector';
        } else if (tech === 'mcct') {
            techName = 'Motion Control Cap Throw';
        } else if (tech === 'rc') {
            techName = 'Roll Cancel';
        };

        let abb;
        if (tech === 'moonclip') {
            abb = 'No abbreviation';
        } else {
            abb = tech;
        };

        let explanation;
        if (tech === 'cbv') {
            explanation =
                'A type of vector done by tilting the joystick ~40 degrees left or right after doing a cap bounce.';
        } else explanation = 'placeholder';

        let techEmbed = new EmbedBuilder()
            .setTitle(techName)
            .setDescription(explanation)
            .addFields(
                { name: '**Abbreviation**', value: abb }
            )
            .setColor(0x3498db);

        interaction.reply({ embeds: [techEmbed] });
    }
}
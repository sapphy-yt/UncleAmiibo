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
        } else if (tech === 'mcct') {
            explanation =
                'A cap throw done with motion controls.';
        } else if (tech === 'rc') {
            explanation =
                `A way to transfer Mario's speed from a roll by tapping X, Y and B in quick succession.`;
        } else if (tech === 'mooncip') {
            explanation =
                'A type of out-of-bounds clip done by jumping and cap throwing against the wall, pushing Mario inside it. Can be done with a backflip, sideflip, triple jump or 2P cap bounce.';
        };

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
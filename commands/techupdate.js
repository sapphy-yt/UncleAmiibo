const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const techData = require('../data/tech.json');

module.exports = {
    name: 'techupdate',

    execute(interaction) {
        let abbreviation = "";
        let description = null;
        let hasAbbreviation = null;
        let technique = null;
        if(interaction.options.get('abbreviation') !== null ){
            abbreviation = interaction.options.get('abbreviation').value; //This can basically never be null, it will take a shit if it ever is lol
            abbreviation = abbreviation.toLowerCase()
        }
        if(interaction.options.get('technique') !== null ){
            technique = interaction.options.get('technique').value;
        }
        if(interaction.options.get('description') !== null ){
            description = interaction.options.get('description').value;
        }
        if(interaction.options.get('hasabbreviation') !== null ){
            hasAbbreviation = interaction.options.get('hasabbreviation').value;
        }
        
        let isUpdate = techData.find(entry => entry.abbreviation.toLowerCase() === abbreviation.toLowerCase()); //searches for the Abbreviation, if it finds anything it's an update
        isUpdate = isUpdate ? true : false;

        
        if(isUpdate){ 
            let oldentry = techData.find(entry => entry.abbreviation.toLowerCase() === abbreviation.toLowerCase());
            if(description === null){
                description = oldentry.description;
            }
            if(hasAbbreviation === null){
                hasAbbreviation = oldentry.hasAbbreviation;
            }
            if(technique === null){
                technique = oldentry.technique;
            }
            
            techData.pop(oldentry)
            
            const newTechniqueUpdated = {
                "abbreviation": abbreviation,
                "name": technique,
                "description": description,
                "hasAbbreviation": hasAbbreviation
            }
            techData.push(newTechniqueUpdated)
            fs.writeFile('./data/tech.json', JSON.stringify(techData), 'utf8', (err) => {
                if (err){
                    console.error("something took a shit")
                    console.log(err)
                    return;
                }
            })
            interaction.reply("Update Successful");
            return;
        }
        else
        {
            if( technique === null || description === null || hasAbbreviation === null ) { //Not all params are filled, give answer, and return
                interaction.reply("You need to provide all parameters if you create a new category");
                return;
            }
            const newTechnique = {
                "abbreviation": abbreviation,
                "name": technique,
                "description": description,
                "hasAbbreviation": hasAbbreviation  
            };
            techData.push(newTechnique);
            fs.writeFile('./data/tech.json', JSON.stringify(techData), 'utf8', (err) => {
                if (err){
                    console.error("something took a shit")
                    console.log(err)
                    return;
                }
            })
            interaction.reply("Insert Successful");
            return;
        }
    }
}

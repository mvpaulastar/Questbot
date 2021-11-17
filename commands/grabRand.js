const { MessageEmbed, MessageAttachment } = require('discord.js');
const {Quests, sequelize} = require('../dbObjects.js');

module.exports = {
    name: 'grabrand',
    description: "grabs and returns a random quest",
    async execute(message, args ){
        const file = new MessageAttachment('./assets/Exclamation_Mark.png');
        const quest = await Quests.findOne({ order: sequelize.random() }); //rand quest

        if(quest){
            const embed = new MessageEmbed() //embed return
                .setColor('#0099ff')
                .setTitle(quest.name)
                .setDescription(quest.description)
                .setThumbnail('attachment://Exclamation_Mark.png')
                .addFields(
                    { name: 'Reward', value: `${quest.reward}`, inline: true },
                    { name: 'Poster', value: `${quest.username}`, inline: true },
                )
                .setTimestamp();
            return message.reply({embeds: [embed], files:[file]});
        }
        return message.reply(`Could not find a quest`);
    }
}
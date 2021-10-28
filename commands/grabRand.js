const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'grabrand',
    description: "grabs and returns a random quest",
    async execute(message, args, Quests, sequelize, Characters, Users ){
        const file = new MessageAttachment('./assets/OrcQuestMan.png');
        const quest = await Quests.findOne({ order: sequelize.random() }); //rand quest

        if(quest){
            const embed = new MessageEmbed() //embed return
                .setColor('#0099ff')
                .setTitle(quest.name)
                .setDescription(quest.description)
                .setThumbnail('attachment://OrcQuestMan.png')
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
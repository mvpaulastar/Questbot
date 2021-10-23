const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'grabRand',
    description: "grabs and returns a random quest",
    async execute(message, Quests, sequelize){
        const quest = await Quests.findOne({ order: sequelize.random() }); //rand quest

        if(quest){
            const embed = new MessageEmbed() //embed return
                .setColor('#0099ff')
                .setTitle(quest.name)
                .setDescription(quest.description)
                .setThumbnail('https://i.imgur.com/fWt7Mqf.jpg')
                .addFields(
                    { name: 'Reward', value: `${quest.reward}`, inline: true },
                    { name: 'Poster', value: `${quest.username}`, inline: true },
                )
                .setTimestamp();
            return message.reply({embeds: [embed]});
        }
        return message.reply(`Could not find a quest`);
    }
}
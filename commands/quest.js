const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'quest',
    description: "quest commands",

    async execute( message, args, Quests, sequelize ){ //Parses args and runs quest args accordingly
        let commandName = args[0];
        if (commandName === 'add') { //add quest
            message.reply('Enter a quest name!');
            const questName = await getReply(message, 60000);
            message.reply('Enter the quest reward!');
            const pay = await getReply(message,60000);
            message.reply('Enter the quest description!');
            const des = await getReply(message, 60000);
            message.reply('What character is posting this?');
            const character = await getReply(message, 60000);

            const embed = new MessageEmbed() //Embed to be sent
            .setColor('#0099ff')
            .setTitle(questName)
            .setDescription(des)
            .setThumbnail('https://i.imgur.com/fWt7Mqf.jpg')
            .addFields(
                { name: 'Reward', value: `${pay}`, inline: true },
                { name: 'Poster', value: `${character}`, inline: true },
                { name: 'User', value: `${message.author.username}`, inline: true },
            )
            .setTimestamp();
    
            try { //Add to db and reply w/ inserted quest
                const quest = await Quests.create({
                    name: questName,
                    reward: pay,
                    description: des,
                    character: character,
                    username: message.author.username,
                });
                return message.reply({embeds: [embed]});
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('That quest already exists.');
                }
                return message.reply('Something went wrong with adding a quest.');
            }
        } else if (commandName === 'edit') { //Edit a quest
            message.reply('What quest are you editing?');
            const questName = getReply(message);
            message.reply('Enter your new quest description.');
            const des = getReply(message);
    
            // equivalent to: UPDATE tags (descrption) values (?) WHERE name = ?;
            const affectedRows = await Quests.update({ description: des }, { where: { name: questName } });
            if (affectedRows > 0) {
                return message.reply(`Quest: ${questName} was edited.`);
            }
            return message.reply(`Could not find a quest with name ${questName}.`);
        } else if (commandName === 'info') { //Grab quest info
            message.reply('What quest are you looking for?');
            const questName = await getReply(message, 60000);
    
            // equivalent to: SELECT * FROM tags WHERE name = 'questName' LIMIT 1;
            const quest = await Quests.findOne({ where: { name: questName } });
            if (quest) {
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(questName)
                .setDescription(quest.description)
                .setThumbnail('https://i.imgur.com/fWt7Mqf.jpg')
                .addFields(
                { name: 'Reward', value: `${quest.reward}`, inline: true },
                { name: 'Poster', value: `${quest.character}`, inline: true },
                { name: 'User', value: `${quest.username}`, inline: true },
                )
                .setTimestamp();
                return message.reply({embeds: [embed]});
            }
            return message.reply(`Could not find quest: ${questName}`);
        } else if (commandName === 'all') { //List all quests
            const questList = await Quests.findAll({ attributes: ['name'] });
            const questString = questList.map(t => t.name).join(', ') || 'No quests set.';
            return message.reply(`List of quests: ${questString}`);
        } else if (commandName === 'rem') { //Remove a quest
            // equivalent to: DELETE from tags WHERE name = ?;
            message.reply('What quest are you looking to remove?');
            const questName = await getReply(message, 60000);
            const rowCount = await Quests.destroy({ where: { name: questName } });
            if (!rowCount) return message.reply('That quest did not exist.');
            return message.reply('Quest removed.');
        }
    }//end execute
}

async function getReply( message, waitPer ){ 
    let reply;
    const filter = m => m.author.id == message.author.id;
    await message.channel.awaitMessages({filter, max:1,time:waitPer,errors:['time']})
    .then( collected => {reply = collected.first().content;})
    .catch(collected => message.reply('You ran out of time! Terminating query.'));
    return reply;
}


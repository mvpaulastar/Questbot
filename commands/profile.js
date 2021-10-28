const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'profile',
    description: "create a user profile",

    async execute( message, args, Quests, sequelize, Characters, Users ){ 
        //if user doesn't exist, create
        const user = await Users.findOne({ where: { user_id: message.author.id } });
        if(!user){const newUser = await Users.create({user_id: message.author.id, name: message.author.username});}

        let commandName = args[0];
        if (commandName === 'add') { //add user
            message.reply('Enter character name!');
            const charName = await getReply(message, 60000);
            message.reply('Enter your character\'s class!');
            const charclass = await getReply(message,60000);
            message.reply('Enter your character\'s subclass!');
            const subclass = await getReply(message, 60000);
            message.reply('Enter your character\'s level!');
            const lvl = await getReply(message, 60000);

            const embed = new MessageEmbed() //Embed to be sent
            .setColor('#0099ff')
            .setTitle(charName)
            .setDescription(charclass)
            .setThumbnail('https://i.imgur.com/fWt7Mqf.jpg')
            .addFields(
                { name: 'Class', value: `${charclass}`, inline: true },
                { name: 'Subclass', value: `${subclass}`, inline: true },
                { name: 'Level', value: `${lvl}`, inline: true },
                { name: 'User', value: `${message.author.username}`, inline: true },
            )
            .setTimestamp();
    
            try { //Add to db and reply w/ inserted char
                const char = await Characters.create({
                    user_id: message.author.id,
                    name: charName,
                    class: charclass,
                    subclass: subclass,
                    level: lvl,
                });
                return message.reply({embeds: [embed]});
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('That char already exists.');
                }
                return message.reply('Something went wrong with adding a char.');
            }
        } else if (commandName === 'info') { //Grab quest info
            message.reply('What character are you looking for?');
            const charName = await getReply(message, 60000);
    
            // equivalent to: SELECT * FROM tags WHERE name = 'questName' LIMIT 1;
            const character = await Characters.findOne({ where: { name: charName, user_id: message.author.id } });
            if (character) {
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(character.name)
                .setDescription(character.class)
                .setThumbnail('https://i.imgur.com/fWt7Mqf.jpg')
                .addFields(
                    { name: 'Class', value: `${character.class}`, inline: true },
                    { name: 'Subclass', value: `${character.subclass}`, inline: true },
                    { name: 'Level', value: `${character.level}`, inline: true },
                    { name: 'User', value: `${message.author.username}`, inline: true },
                )
                .setTimestamp();
                return message.reply({embeds: [embed]});
            }
            return message.reply(`Could not find character: ${charName}`);
        }else if (commandName === 'all') { //List all chars associated with the user
            const charList = await Characters.findAll({ where:{user_id: message.author.id} });
            const charString = charList.map(t => t.name).join(', ') || 'No characters set.';
            return message.reply(`List of characters: ${charString}`);
        } else if (commandName === 'rem') { //Remove a quest
            // equivalent to: DELETE from tags WHERE name = ?;
            message.reply('What character are you looking to remove?');
            const charName = await getReply(message, 60000);
            const rowCount = await Characters.destroy({ where: { name: charName, user_id: message.author.id } });
            if (!rowCount) return message.reply('That character did not exist.');
            return message.reply('Character removed.');
        }
    }
}

async function getReply( message, waitPer ){ 
    let reply;
    const filter = m => m.author.id == message.author.id;
    await message.channel.awaitMessages({filter, max:1,time:waitPer,errors:['time']})
    .then( collected => {reply = collected.first().content;})
    .catch(collected => message.reply('You ran out of time! Terminating query.'));
    return reply;
}
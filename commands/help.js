const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Bot returns help info in an embed",
    execute(message, args ){
        let embed;
        const file = new MessageAttachment('./assets/Question_Mark.png');
        switch(args[0]){
            case 'profile':
                embed = new MessageEmbed()	
                    .setColor('#0099ff')
                    .setTitle('User Profile commands')
                    .setDescription('?profile [argument]')
                    .setThumbnail('attachment://Question_Mark.png')
                    .addFields(
                        { name: 'add', value: 'Add a character', inline: true },
                        { name: 'edit', value: '[NOT IMPLEMENTED] Edit a character', inline: true },
                        { name: 'info', value: 'Display info of one of your characters', inline: true },
                        { name: 'all', value: 'Gives a list of all your characters', inline: true },
                        { name: 'rem', value: 'Remove one of your characters', inline: true },
                    )
                    .setTimestamp();
                return message.author.send({embeds: [embed], files:[file]});
                break;
            case 'quests':
                embed = new MessageEmbed()	
                    .setColor('#0099ff')
                    .setTitle('Quest commands')
                    .setDescription('?quest [argument]')
                    .setThumbnail('attachment://Question_Mark.png')
                    .addFields(
                        { name: 'add', value: 'Add a quest', inline: true },
                        { name: 'edit', value: 'Edit a quest', inline: true },
                        { name: 'info', value: 'Display specific quest info', inline: true },
                        { name: 'all', value: 'Gives a list of all quests', inline: true },
                        { name: 'rem', value: 'Remove a quest', inline: true },
                    )
                    .setTimestamp();
                return message.author.send({embeds: [embed], files:[file]});
                break;
            case 'commands':
                embed = new MessageEmbed()	
                    .setColor('#0099ff')
                    .setTitle('Misc Commands')
                    .setThumbnail('attachment://Question_Mark.png')
                    .addFields(
                        { name: '?ping', value: 'Replies pong!', inline: true },
                        { name: '?prefix [newPrefix]', value: 'Changes server prefix', inline: true },
                    )
                    .setTimestamp();
                return message.author.send({embeds: [embed], files:[file]});
                break;
            default:
                embed = new MessageEmbed()	
                    .setColor('#0099ff')
                    .setTitle('Help Commands')
                    .setThumbnail('attachment://Question_Mark.png')
                    .addFields(
                        { name: 'Profile', value: '?help profile', inline: true },
                        { name: 'Quests', value: '?help quests', inline: true },
                        { name: 'Commands', value: '?help commands', inline: true },
                    )
                    .setTimestamp();
                return message.author.send({embeds: [embed], files:[file]});
        }
    }
}


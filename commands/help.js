const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Bot returns help info in an embed",
    execute(message ){
        let embed = new MessageEmbed()	
        .setColor('#0099ff')
        .setTitle('Help Commands')
        .setDescription('A list of all commands associated with Log Hunter')
        .setThumbnail('https://i.imgur.com/w0sGl.jpeg')
        .addFields(
            { name: 'ping', value: 'Returns Pong!', inline: true },
            { name: 'grabRand', value: 'Grabs a random quest!', inline: true },
            { name: 'prefix [new prefix]', value: 'Changes the bot\'s responding prefix', inline: true },
            { name: 'quest [add|edit|info|all|rem]', value: '[Add quest|edit quest|grab quest info|list all quests|remove a quest]', inline: true },
        )
        .setTimestamp();
        message.author.send({embeds: [embed]});
    }
}


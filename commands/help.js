module.exports = {
    name: 'help',
    description: "Bot returns help info in an embed",
    execute(message, args, Discord ){
        let embed = new Discord.MessageEmbed()	
        .setColor('#0099ff')
        .setTitle('Help Commands')
        .setDescription('A list of all commands associated with Log Hunter')
        .addFields(
            { name: 'ping', value: 'Returns Pong!', inline: true },
            { name: 'grabRand', value: 'Grabs a random quest!', inline: true },
        )
        .setTimestamp()
        message.author.send({embeds: [embed]});
    }
}


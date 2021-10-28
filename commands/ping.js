module.exports = {
    name: 'ping',
    description: "Bot returns pong",
    execute(message, args, Quests, sequelize, Characters, Users ){
        message.channel.send('Pong!');
    }
}
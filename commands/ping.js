module.exports = {
    name: 'ping',
    description: "Bot returns pong",
    execute(message, args){
        message.channel.send('Pong!');
    }
}
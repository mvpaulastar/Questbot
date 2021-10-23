module.exports = {
    name: 'ping',
    description: "Bot returns pong",
    execute(message){
        message.channel.send('Pong!');
    }
}
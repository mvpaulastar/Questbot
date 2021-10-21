const { Client, Intents, DiscordAPIError } = require('discord.js'); //Connects to Client
const Discord = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const prefix = '?'; //Prefix the bot will use to execute commands

client.once('ready', () => { //Checks if bot came online when run
    console.log('Log Hunter is ready to quest!');
});

const fs = require('fs'); 
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file=> file.endsWith('.js')); //Grabs the .js file that contains code for commands

for(const file of commandFiles){ //loops through the command file to load commands
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {
    if( !message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if( command == 'ping' ){ //simple ping command
        client.commands.get('ping').execute(message,args);
    }else if( command == 'help'){ //sends the user the command list
        client.commands.get('help').execute(message, args, Discord );
    }

});
client.login('ODkyNjE5MDMwMDg5ODU5MDk0.YVPiQA.mDGSk_Qfoa8TEJYBQt3CwKof-7Y'); //Make sure this is the last line of this file!
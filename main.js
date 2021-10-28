const fs = require('fs'); 
const { token } = require('./config.json');
const Sequelize = require('sequelize');
const { Client, Intents, Collection, ReactionUserManager } = require('discord.js'); 
const { Users, Quests, sequelize, Characters } = require('./dbObjects.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
let prefix = '?'; //Prefix the bot will use to execute commands

client.commands = new Collection();

//Grabs the .js file that contains code for commands
const commandFiles = fs.readdirSync('./commands/').filter(file=> file.endsWith('.js')); 
for(const file of commandFiles){ //loops through the command file to load commands
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => { 
    console.log('Log Hunter is ready to quest!');
});

client.on('messageCreate', async message => {
    if( !message.content.startsWith(prefix) || message.author.bot ) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command))return;
    try{
        client.commands.get(command).execute(
            message,
            args,
            Quests,
            sequelize,
            Characters,
            Users,
        );
    }catch(error){
        console.error(error);
        message.reply("There was an error trying to execute the command");
    }
});

client.login(token); //Make sure this is the last line of this file!

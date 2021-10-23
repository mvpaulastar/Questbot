const fs = require('fs'); 
const { token } = require('./config.json');
const Sequelize = require('sequelize');
const { Client, Intents, Collection } = require('discord.js'); 
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
let prefix = '?'; //Prefix the bot will use to execute commands

client.commands = new Collection();

//Grabs the .js file that contains code for commands
const commandFiles = fs.readdirSync('./commands/').filter(file=> file.endsWith('.js')); 
for(const file of commandFiles){ //loops through the command file to load commands
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Initialize the db 
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

//Data model
const Quests = sequelize.define('quests',{
    name:{
        type: Sequelize.STRING,
        unique: true,
    },
    reward:{
        type: Sequelize.STRING,
        defaultValue: '0',
        allowNull:false,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
});

client.once('ready', () => { 
    Quests.sync();
    console.log('Log Hunter is ready to quest!');
});

client.on('messageCreate', async message => {
    if( !message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if( command == 'ping' ){ //simple ping command
        client.commands.get('ping').execute(message);
    }else if( command == 'help'){ //sends the user the command list
        client.commands.get('help').execute(message);
    }else if( command == 'prefix'){ //changes the prefix of the bot
        prefix = args[0];
        message.reply(`Prefix changed to ${args[0]}`);
    }else if( command == 'quest' ){ //quest commands and args
        client.commands.get('quest').execute( message, args[0], Quests);
    }else if( command == 'grabrand' ){
        client.commands.get('grabRand').execute(message, Quests, sequelize);
    }
});

client.login(token); //Make sure this is the last line of this file!

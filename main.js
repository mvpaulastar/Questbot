const { Client, Intents } = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log('Bot Online');
});

client.login('ODkyNjE5MDMwMDg5ODU5MDk0.YVPiQA.mDGSk_Qfoa8TEJYBQt3CwKof-7Y'); //last line of file
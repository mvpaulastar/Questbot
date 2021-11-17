# Questbot

This is a Discord bot created to manage quests and characters for Dungeons and Dragons.

Utilizes: 
- Node.js runtime version: 16.10.0
- Discord.js version: 13.2.0
- Sequelize version: 6.8.0
- Sqlite3: 5.0.2
    
If you want to run the bot make sure you have all of those dependencies and the Node.js runtime!
To setup the bot:
- Create a config.json file in the same folder as your main.js file and paste the following code into it ```{
    "token": "YOUR DISCORD BOT TOKEN HERE. CREATE A BOT APP AT discord.com/developers"
}```

- Before starting up the bot make sure you execute
    ```node dbInit.js -f```
in the command line to sync the databases. You only need to do this before you launch the bot for the first time!

Coded by Paula Sirisumpund

Images created by Scott Crowley

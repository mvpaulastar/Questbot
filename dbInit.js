const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username,','password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/Quests.js')(sequelize, Sequelize.DataTypes);
require('./models/Characters.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () => {
    console.log('Database Synced');
    sequelize.close();
}).catch(console.error);

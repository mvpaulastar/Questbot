module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('quests',{
        name:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        reward:{
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: false,
        },
        description: DataTypes.TEXT,
        character: DataTypes.STRING,
        username: DataTypes.STRING,
    });
};
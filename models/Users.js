module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('users',{
        user_id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    });
};
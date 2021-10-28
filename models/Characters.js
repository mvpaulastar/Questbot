module.exports = (sequelize, DataTypes) => {
	return sequelize.define('characters', {
		user_id: DataTypes.STRING,
		name: DataTypes.STRING,
        class: DataTypes.STRING,
        subclass: DataTypes.STRING,
        level:{
            type: DataTypes.INTEGER,
            defaultValue: '0',
            allowNull: false,
        },
    });
};
module.exports = (connection, sequelize) => {
    const User = connection.define('User', {
        id:{
            type: sequelize.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        firstname: {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: sequelize.DataTypes.STRING,
        },
        address: {
            type: sequelize.DataTypes.TEXT,
        },
        postcode: {
            type: sequelize.DataTypes.STRING,
        },
        contact: {
            type: sequelize.DataTypes.STRING,
        },
        email: {
            type: sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username:{
            type: sequelize.DataTypes.STRING,
            allowNull:false
        },
        password:{
            type: sequelize.DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        tableName: 'users'
    });

    return User;
}
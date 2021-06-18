module.exports = (connection, sequelize) => {
    const User = connection.define('User', {
        id:{
            type: sequelize.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        firstName: {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize.DataTypes.STRING,
        },
        address: {
            type: sequelize.DataTypes.TEXT,
            allowNull: false
        },
        postCode: {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: sequelize.DataTypes.STRING,
            allowNull: false
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
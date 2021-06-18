const {Sequelize} = require('sequelize');
require('dotenv/config');

// database connection
const connection = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

module.exports = connection;
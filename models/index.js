const connection = require('../config/database');
const sequelize = require('sequelize');
let db = {};
db.connection = connection;
db.sequelize = sequelize;

/**
 * MODELS
 * 
 * 
 */

db.user = require('./User')(connection, sequelize);

 module.exports = db;

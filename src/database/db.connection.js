const { Sequelize } = require('sequelize')
const { database } = require('../config/config')

const sequelize = new Sequelize(
    database.DB_NAME,
    database.DB_USER,
    database.DB_PASS,
    {
        host: database.DB_HOST,
        dialect: database.DB_DIALECT,
        logging: false
    }
)

module.exports = sequelize

const { Sequelize } = require('sequelize')
const { database, NODE_ENV, DATABASE_URL} = require('../config/config')

function initConnectionLocal(database) {
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
    return sequelize
}

function initConnectionProd(url) {
    const sequelize = new Sequelize(url, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    )    
    return sequelize
}

let instanceDb = null

if (NODE_ENV === 'production') {
    instanceDb = initConnectionProd(DATABASE_URL)
} else {
    instanceDb = initConnectionLocal(database)
}


module.exports = instanceDb

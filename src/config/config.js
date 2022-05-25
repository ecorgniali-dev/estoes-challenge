require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 8080,
    database: {
        DB_DIALECT: process.env.DB_DIALECT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT
    }
}

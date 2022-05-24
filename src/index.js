const express = require('express')
const app = express()
const sequelize = require('./database/db.connection')
require('./models/associations')
const cors = require('cors')
const config = require('./config/config')

const indexRouter = require('./routes/index.routes')

// cors
app.use(cors())

// docSwagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(require('./config/swagger'));

// miidlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/', indexRouter)


// error handler
app.use((err, req, res, next) => {
    console.log(err);
    // normalize error
    if (!err.status) {
        err.status = 500
        err.message = 'Internal Server Error'
    }
    if (err.validationErrorPaginate) {
        return res.status(err.status).json(err.validationErrorPaginate)
    }
    res.status(err.status).json({ error: err.message })
})


// run server express
app.listen(config.PORT, async () => {
    console.log(`Server express running on http://localhost:${config.PORT}`)

    // connection db
    try {
        await sequelize.sync({ force: false });
        console.log('Database connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error.message)
    }

})

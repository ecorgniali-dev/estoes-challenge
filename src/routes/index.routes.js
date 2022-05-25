const express = require('express')
const router = express.Router()

const { swaggerUi, swaggerDocs } = require('../config/swagger')
const webRouter = require('./web.routes')
const projectsRouter = require('./projects.routes')
const usersRouter = require('./users.routes')

router.use('/', webRouter)
router.use('/projects', projectsRouter)
router.use('/users', usersRouter)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router
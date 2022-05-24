const express = require('express')
const router = express.Router()

const projectsRouter = require('./projects.routes')
const usersRouter = require('./users.routes')

router.use('/projects', projectsRouter)
router.use('/users', usersRouter)

module.exports = router
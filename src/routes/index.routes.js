const express = require('express')
const router = express.Router()

const projectsRouter = require('./projects.routes')

router.use('/projects', projectsRouter)

module.exports = router
const express = require('express')
const Router = express.Router()

const listRoutes = require('./list.routes')
const taskRoutes = require('./task.routes')

Router.use('/list', listRoutes)

Router.use('/task', taskRoutes)

module.exports = Router

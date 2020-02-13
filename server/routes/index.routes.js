const express = require('express')
const Router = express.Router()

const listRoutes = require('./list.routes')

Router.use('/list', listRoutes)

module.exports = Router

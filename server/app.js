const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { connectDB } = require('./db')
const app = express()
const port = process.env.APP_PORT || 8000

app.use(express.json())
app.use(cors())
connectDB()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

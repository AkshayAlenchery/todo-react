const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { connectDB } = require('./db')
const routes = require('./routes/index.routes')

const app = express()
const port = process.env.APP_PORT || 8000

connectDB()
app.use(express.json())
app.use(cors())
app.use('/api/v3.0/', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()
const port = process.env.APP_PORT || 8000

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

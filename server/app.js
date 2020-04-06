const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const { connectDB } = require('./db')
const routes = require('./routes/index.routes')

const app = express()
const port = process.env.APP_PORT || 8000

connectDB()
app.use(express.json())
app.use(cors())
app.use('/api/v3.0/', routes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

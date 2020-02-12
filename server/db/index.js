const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todo_app', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('MongoDB is ready')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connectDB }

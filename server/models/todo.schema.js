const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [],
  createdOn: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo

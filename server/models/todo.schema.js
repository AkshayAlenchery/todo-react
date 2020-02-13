const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const todoSchema = new Schema({
  listName: {
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

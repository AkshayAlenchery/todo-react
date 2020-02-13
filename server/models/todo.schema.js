const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const todoSchema = new Schema({
  listId: ObjectId,
  listName: String,
  tasks: []
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo

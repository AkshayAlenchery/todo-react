const todoModel = require('../models/todo.schema')

/**
 * Create a new list
 * @param listName
 * @return false | new todo object
 */
const createNewList = async listName => {
  try {
    const todo = new todoModel()
    todo.listName = listName
    await todo.save()
    return todo
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = { createNewList }

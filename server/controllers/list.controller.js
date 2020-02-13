const TodoModel = require('../models/todo.schema')

/**
 * Create a new list - POST
 * @param listName
 * @return false | new todo object
 */
const createNewList = async listName => {
  try {
    const todo = new TodoModel()
    todo.listName = listName
    await todo.save()
    return todo
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Load all the list - GET
 * @return array of lists
 */
const loadAllLists = async () => {
  try {
    return await TodoModel.find()
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Update a list - PUT
 * @param listId
 * @param newListName
 * @return false | [updated list] | [] (list not found)
 */
const updateList = async (listId, newListName) => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return []
    const list = await TodoModel.findOne({ _id: listId })
    if (!list) return []
    list.listName = newListName
    await list.save()
    return [list]
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Delete a list - DELETE
 * @param listId
 * @return false | [deleted list] | [] (list not found)
 */
const deleteList = async listId => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return []
    const list = await TodoModel.findOne({ _id: listId })
    if (!list) return []
    await list.remove()
    return [list]
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = { createNewList, loadAllLists, updateList, deleteList }

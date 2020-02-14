const TodoModel = require('../models/todo.schema')

/**
 * To load all tasks of a list
 * @param listId
 * @return false | [ task ] | null
 */
const loadAllTasks = async listId => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return 2
    const list = await TodoModel.findOne({ _id: listId })
    if (!list) return 2
    return list
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Adding a new task
 * @param  listId
 * @param  task
 * @return false | [] | [new task]
 */
const addNewTask = async (listId, task) => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return []
    const list = await TodoModel.findOne({ _id: listId })
    if (!list) return []
    const newTask = {
      name: task.name,
      completed: false,
      priority: 0,
      scheduled: false,
      note: ''
    }
    list.tasks.push(newTask)
    await list.save()
    return [list]
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * To update a task
 * @param listId
 * @param updatedTask
 * @return false | [] | [updated list]
 */
const updateTask = async (listId, updatedTask) => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return []
    const list = await TodoModel.findById({ _id: listId })
    if (!list) return []
    const index = list.tasks.findIndex(list => list._id == updatedTask.taskId)
    console.log(index)
    if (index === -1) return []
    list.tasks[index][updatedTask.type] = updatedTask.value
    await list.save()
    return [list]
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * To delete a task
 * @param listId
 * @param deleteTask
 * @return false | [] | [deleted list]
 */
const deleteTask = async (listId, deleteTask) => {
  try {
    if (!listId.match(/^[0-9a-fA-F]{24}$/)) return []
    const list = await TodoModel.findOne({ _id: listId })
    if (!list) return []
    const index = list.tasks.findIndex(list => list._id == deleteTask.taskId)
    if (index === -1) return []
    list.tasks.splice(index, 1)
    await list.save()
    return [list]
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = { loadAllTasks, addNewTask, updateTask, deleteTask }

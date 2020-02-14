const express = require('express')
const Router = express.Router()

const taskController = require('../controllers/task.controller')

/**
 * Load all tasks of a list
 * GET /api/v3.0/task/:taskId
 */
Router.get('/:listId', async (req, res) => {
  const result = await taskController.loadAllTasks(req.params.listId)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while fetching the tasks. Please try again later.'
    })
  }
  if (result === 2) {
    return res.status(404).json({
      type: 'Error',
      message: 'The list you are looking for is not available'
    })
  }
  res.status(200).json({ taskCount: result.tasks.length, tasks: result.tasks })
})

/**
 * Add a new task to a list
 * POST /api/v3.0/task/:listId
 */
Router.post('/:listId', async (req, res) => {
  const result = await taskController.addNewTask(req.params.listId, req.body)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while adding the tasks. Please try again later.'
    })
  }
  if (!result.length) {
    return res.status(404).json({
      type: 'Error',
      message: 'The list you are looking for is not available. Couldnot add task'
    })
  }
  res.status(200).json({ inserted: true, list: result })
})

/**
 * Update a task
 * PUT /api/v3.0/task/:listId
 */
Router.put('/:listId', async (req, res) => {
  const result = await taskController.updateTask(req.params.listId, req.body)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while updating the tasks. Please try again later.'
    })
  }
  if (!result.length) {
    return res.status(404).json({
      type: 'Error',
      message: 'The list / task you are looking for is not available. Couldnot update task'
    })
  }
  res.status(200).json({ updated: true, list: result[0] })
})

/**
 * Delete a task
 * DELETE /api/v3.0/task/:listId
 */
Router.delete('/:listId', async (req, res) => {
  const result = await taskController.deleteTask(req.params.listId, req.body)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while deleting the tasks. Please try again later.'
    })
  }
  if (!result.length) {
    return res.status(404).json({
      type: 'Error',
      message: 'The list / task you are looking for is not available. Couldnot update task'
    })
  }
  res.status(200).json({ deleted: true, list: result[0] })
})

module.exports = Router

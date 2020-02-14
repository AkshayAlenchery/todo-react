const express = require('express')
const Router = express.Router()
const listController = require('../controllers/list.controller')

/**
 * Creating a new list
 * POST /api/v3.0/list
 */
Router.post('/', async (req, res) => {
  const result = await listController.createNewList(req.body.name)
  if (result) return res.status(200).json(result)
  res.status(500).json({
    type: 'Error',
    message: 'There was a problem while creating the list. Please try again later'
  })
})

/**
 * Loading all list
 * GET /api/v3.0/list
 */
Router.get('/', async (req, res) => {
  const result = await listController.loadAllLists()
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while loading all the list. Please try again later'
    })
  }
  if (!result.length) return res.status(200).json({ listCount: 0, lists: [] })
  res.status(200).json({ listCount: result.length, lists: result })
})

/**
 * Update a list
 * PUT /api/v3.0/list/:listId
 */
Router.put('/:listId', async (req, res) => {
  const result = await listController.updateList(req.params.listId, req.body.name)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while updating the list. Please try again later.'
    })
  }
  if (!result.length) {
    return res.status(404).json({
      type: 'Error',
      message: 'The list you are looking for is not available.'
    })
  }
  res.status(200).json({ updated: true, list: result })
})

/**
 * Delete a list
 * DELETE /api/v3.0/list/
 */
Router.delete('/:listId', async (req, res) => {
  const result = await listController.deleteList(req.params.listId)
  if (!result) {
    return res.status(500).json({
      type: 'Error',
      message: 'There was a problem while deleting the list. Please try again later.'
    })
  }
  if (result.length) return res.status(200).json({ delete: true, list: result[0] })
  res.status(404).json({
    type: 'Error',
    message: 'The list you are looking for is not available.'
  })
})

module.exports = Router

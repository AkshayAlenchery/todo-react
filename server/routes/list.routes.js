const express = require('express')
const Router = express.Router()
const listController = require('../controllers/list.controller')

Router.post('/', async (req, res) => {
  const { listName } = req.body
  const result = await listController.createNewList(listName)
  if (result) res.status(200).json(result)
  else {
    res.status(500).json({
      type: 'Error',
      message: 'There was a problem while creating the list. Please try again later'
    })
  }
})

module.exports = Router

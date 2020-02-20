import React from 'react'
import { BrowserRouter as Router, useParams } from 'react-router-dom'

function Task() {
  const { listId } = useParams()
  console.log(listId)
  return (
    <div>
      <h1>Tasks</h1>
    </div>
  )
}

export default Task

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './editTask.css'

function EditTask(props) {
  const task = props.task
  const update = props.update

  const [hasError, toggleError] = useState(false)

  const updateName = event => {
    toggleError(false)
    const taskName = event.target.value
    if (event.keyCode === 13 && taskName.length) return update({ type: 'name', value: taskName })
    toggleError(true)
  }

  return (
    <div id='edit-task-ctnr'>
      <div id='edit-header'>
        <h3>Edit task</h3>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => props.close()} />
      </div>
      <div id='edit-container'>
        <input
          type='text'
          placeholder='Please enter a task name'
          defaultValue={task.name}
          className={hasError ? 'error' : ''}
          onKeyDown={e => updateName(e)}
          disabled={task.completed ? true : false}
        />
        <div id='input-row'>
          <input
            type='date'
            defaultValue={task.scheduled}
            onChange={e => update({ type: 'scheduled', value: e.target.value })}
            disabled={task.completed ? true : false}
          />
          <select
            defaultValue={task.priority}
            onChange={e => update({ type: 'priority', value: e.target.value })}
            disabled={task.completed ? true : false}>
            <option value='0'>Low</option>
            <option value='1'>Medium</option>
            <option value='2'>High</option>
          </select>
        </div>
        <textarea
          placeholder='Add a note'
          defaultValue={task.note}
          onKeyDown={e => {
            if (e.keyCode === 13 && e.shiftKey) update({ type: 'note', value: e.target.value })
          }}
          disabled={task.completed ? true : false}></textarea>
        <button
          type='button'
          className='dlt-btn'
          onClick={e => {
            e.preventDefault()
            props.close()
            props.delete()
          }}>
          Delete task
        </button>
      </div>
    </div>
  )
}

export default EditTask

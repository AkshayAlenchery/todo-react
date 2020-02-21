import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import './task.css'
import EditTask from './EditTask'

function Task(props) {
  const { listId } = useParams()
  const [tasks, setTasks] = useState([])
  const [list, setList] = useState({})
  const [eListName, setEListName] = useState(false)
  const [listError, setListError] = useState(false)
  const [taskError, setTaskError] = useState(false)
  const [editTask, setEditTask] = useState({ status: false, index: null })

  useEffect(() => {
    fetchAllTasks()
  }, [])

  const fetchAllTasks = async () => {
    try {
      const resp = await Axios('http://localhost:5500/api/v3.0/task/' + listId)
      setTasks(sort(resp.data.tasks))
      setList(resp.data.list)
    } catch (err) {
      window.location = '/404'
    }
  }

  const sort = tasks => {
    const high = []
    const medium = []
    const low = []
    const completed = []
    tasks.forEach(task => {
      if (task.completed === true) return completed.push(task)
      if (task.priority * 1 === 0) return low.push(task)
      if (task.priority * 1 === 1) return medium.push(task)
      if (task.priority * 1 === 2) return high.push(task)
    })
    high.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
    medium.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
    low.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
    return [...high, ...medium, ...low, ...completed]
  }

  const updateLstName = async event => {
    setListError(false)
    const listName = event.target.value
    if (event.keyCode === 13 && listName.length) {
      try {
        await Axios({
          method: 'PUT',
          url: 'http://localhost:5500/api/v3.0/list/' + listId,
          data: {
            name: listName
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setList({ ...list, name: listName })
        setEListName(false)
        props.showMsg({ type: 'success', message: 'Updated ' + listName + ' successfully' })
        return
      } catch (err) {
        console.log(err)
        props.showMsg({ type: 'error', message: 'Failed to update list name' })
      }
    }
    if (event.keyCode === 27) return setEListName(false)
    if (event.keyCode === 13 && !listName.length) setListError(true)
  }

  const addNewTask = async event => {
    event.persist()
    setTaskError(false)
    event.target.placeholder = 'Add a new task'
    const taskName = event.target.value
    if (event.keyCode === 13 && !taskName.length) {
      setTaskError(true)
      event.target.placeholder = 'Please enter a task name'
      return
    }
    if (event.keyCode === 13 && taskName.length) {
      try {
        const resp = await Axios({
          method: 'POST',
          url: 'http://localhost:5500/api/v3.0/task/' + listId,
          data: {
            name: taskName
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        event.target.value = ''
        setTasks(sort(resp.data.list[0].tasks))
        props.showMsg({ type: 'success', message: 'Added new task successfully' })
        return
      } catch (err) {
        console.log(err)
        props.showMsg({ type: 'error', message: 'Failed to add new task' })
      }
    }
  }

  const updateTask = async task => {
    try {
      const resp = await Axios({
        method: 'PUT',
        url: 'http://localhost:5500/api/v3.0/task/' + listId,
        data: {
          taskId: tasks[editTask.index]._id,
          ...task
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTasks(sort(resp.data.list.tasks))
      props.showMsg({ type: 'success', message: 'Updated task successfully' })
    } catch (err) {
      console.log(err)
      props.showMsg({ type: 'error', message: 'Failed to update task' })
    }
  }
  const deleteTask = async () => {
    try {
      const resp = await Axios({
        method: 'DELETE',
        url: 'http://localhost:5500/api/v3.0/task/' + listId,
        data: {
          taskId: tasks[editTask.index]._id
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTasks(sort(resp.data.list.tasks))
      props.showMsg({ type: 'success', message: 'Deleted task successfully' })
    } catch (err) {
      console.log(err)
      props.showMsg({ type: 'error', message: 'Failed to delete task' })
    }
  }

  const completeTask = async (id, status) => {
    try {
      const resp = await Axios({
        method: 'PUT',
        url: 'http://localhost:5500/api/v3.0/task/' + listId,
        data: {
          taskId: id,
          type: 'completed',
          value: status
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTasks(sort(resp.data.list.tasks))
      if (status) props.showMsg({ type: 'success', message: 'Task has been marked complete' })
      else props.showMsg({ type: 'success', message: 'Task has been marked incomplete' })
    } catch (err) {
      console.log(err)
      props.showMsg({ type: 'error', message: 'Failed to complete task' })
    }
  }

  return (
    <div>
      <div id='tasks-container'>
        <div id='tasks-ctnr-header'>
          <Link to='/'>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </Link>
          {eListName ? (
            <input
              type='text'
              placeholder='Enter a list name'
              defaultValue={list.name}
              className={listError ? 'error' : ''}
              onKeyDown={e => updateLstName(e)}
            />
          ) : (
            <h3>{list.name}</h3>
          )}
          <FontAwesomeIcon icon={faEdit} onClick={() => setEListName(true)} />
        </div>
        <div id='task-add-form'>
          <input
            type='text'
            placeholder='Add a new task'
            className={taskError ? 'error' : ''}
            onKeyDown={e => addNewTask(e)}
          />
        </div>
        <div id='tasks'>
          {!tasks.length ? (
            <p className='no-task'>No tasks present</p>
          ) : (
            tasks.map((task, index) => (
              <div className='task' key={task._id}>
                <input
                  type='checkbox'
                  defaultChecked={task.completed}
                  onClick={e => completeTask(task._id, e.target.checked)}
                />
                <h3
                  onClick={() => setEditTask({ status: true, index: index })}
                  className={
                    task.completed
                      ? 'completed'
                      : task.priority * 1 === 2
                      ? 'high'
                      : task.priority * 1 === 1
                      ? 'medium'
                      : ''
                  }>
                  {task.name}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
      {editTask.status ? (
        <EditTask
          task={tasks[editTask.index]}
          close={() => setEditTask({ status: false, index: null })}
          delete={() => deleteTask()}
          update={task => updateTask(task)}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default Task

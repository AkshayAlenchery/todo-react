import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import './list.css'

function List() {
  const [lists, setLists] = useState([])
  const [listInput, setListInput] = useState('')
  const [searchOutput, setSearchOutput] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      const resp = await Axios.get('http://localhost:5500/api/v3.0/list/')
      setLists(resp.data.lists)
      setSearchOutput(resp.data.lists)
    } catch (err) {
      console.log(err)
    }
  }

  const searchInList = event => {
    setHasError(false)
    event.target.placeholder = 'Search | Add a new list'
    const listName = event.target.value
    setListInput(listName)
    if (listName.length)
      return setSearchOutput(
        lists.filter(list => list.name.toLowerCase().includes(listName.toLowerCase()))
      )
    return setSearchOutput(lists)
  }

  const addNewList = async event => {
    event.preventDefault()
    if (!listInput.length) {
      setHasError(true)
      event.target.childNodes[0].placeholder = 'Please enter a list name'
      return
    }
    try {
      const resp = await Axios({
        method: 'POST',
        url: 'http://localhost:5500/api/v3.0/list/',
        data: {
          name: listInput
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newLists = [...lists, ...[{ _id: resp.data._id, name: resp.data.name }]]
      setLists(newLists)
      setSearchOutput(newLists)
      setListInput('')
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async id => {
    try {
      await Axios({
        method: 'DELETE',
        url: 'http://localhost:5500/api/v3.0/list/' + id
      })
      const tempState = lists.filter(list => list._id !== id)
      setSearchOutput(tempState)
      setLists(tempState)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id='list-container'>
      <div id='list-add-form'>
        <form onSubmit={e => addNewList(e)}>
          <input
            type='text'
            placeholder='Search | Add a new list'
            onChange={e => searchInList(e)}
            className={hasError ? 'error' : ''}
            value={listInput}
          />
        </form>
      </div>
      <div id='lists'>
        {!searchOutput.length ? (
          <p>No lists present</p>
        ) : (
          searchOutput.map(list => (
            <div className='list' key={list._id}>
              <Link to={`tasks/${list._id}`}>{list.name}</Link>
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(list._id)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List

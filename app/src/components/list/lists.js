import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import './list.css'

function List(props) {
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
      props.showMsg({ type: 'error', message: 'There was an issue. Please try again later' })
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
      props.showMsg({ type: 'success', message: listInput + ' created successfully' })
    } catch (err) {
      console.log(err)
      props.showMsg({ type: 'error', message: 'Error while creating list. Try again later' })
    }
  }

  const deleteTask = async id => {
    try {
      const resp = await Axios({
        method: 'DELETE',
        url: 'http://localhost:5500/api/v3.0/list/' + id
      })
      const tempState = lists.filter(list => list._id !== id)
      setSearchOutput(tempState)
      setLists(tempState)
      props.showMsg({ type: 'success', message: resp.data.list.name + ' deleted successfully' })
    } catch (err) {
      console.log(err)
      props.showMsg({ type: 'error', message: 'Error while deleting list. Try again later' })
    }
  }

  return (
    <div id='list-container'>
      <div id='list-add-form'>
        <form onSubmit={e => addNewList(e)}>
          <input
            type='text'
            placeholder='Search | Add a new list'
            onChange={searchInList}
            className={hasError ? 'error' : ''}
            value={listInput}
          />
        </form>
      </div>
      <div id='lists'>
        {!searchOutput.length ? (
          <p className='no-list'>No lists present</p>
        ) : (
          searchOutput.map(list => (
            <div className='list' key={list._id}>
              <Link to={`tasks/${list._id}`}>{list.name}</Link>
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTask(list._id)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List

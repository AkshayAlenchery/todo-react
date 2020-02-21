import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './components/list/lists'
import Task from './components/tasks/tasks'
import NotFound from './components/404/NotFound'
import './App.css'

function App() {
  const [message, setMsg] = useState({ type: null, message: null })

  const setMessage = msg => {
    setMsg(msg)
    setTimeout(() => {
      setMsg({ type: null, message: null })
    }, 4000)
  }
  return (
    <div className='app'>
      <h1 id='logo'>Todo App</h1>
      <div>
        {message.message ? (
          <p className={message.type === 'error' ? 'err-msg' : 'scs-msg'}>{message.message}</p>
        ) : (
          ''
        )}
      </div>
      <Router>
        <Switch>
          <Route path='/' exact>
            <List showMsg={msg => setMessage(msg)} />
          </Route>
          <Route path='/tasks/:listId' exact>
            <Task showMsg={msg => setMessage(msg)} />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

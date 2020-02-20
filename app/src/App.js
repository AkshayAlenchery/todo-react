import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './components/list/AllList'
import Task from './components/tasks/AllTask'
import NotFound from './components/404/NotFound'

function App() {
  return (
    <div className='app'>
      <h1>Todo App</h1>
      <Router>
        <Switch>
          <Route path='/' exact>
            <List />
          </Route>
          <Route path='/tasks/:listId' exact>
            <Task />
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

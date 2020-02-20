import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './components/List'
import Task from './components/Task'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className='app'>
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

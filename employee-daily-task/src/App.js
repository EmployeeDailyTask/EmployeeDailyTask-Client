import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
LandingPage,
HomePage
} from './pages'
import {
Provider
} from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/xcidic' component={HomePage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;

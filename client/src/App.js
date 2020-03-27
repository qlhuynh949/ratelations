import React from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BottomNavBar from './components/BottomNavBar'
import TopNavBar from './components/TopNavBar'
import HomePage from './components/HomePage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


const App = () => {
  return (
    <>
      <Router>
        <div>
          <TopNavBar />
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/homepage">
            <HomePage />
            </Route>
          </Switch>
          <BottomNavBar />

        </div>
      </Router>


    </>
  );
}

export default App;

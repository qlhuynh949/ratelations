import React from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'




function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/">login page </Link>
          <br></br>
          <Link to="/homepage">home page</Link>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/homepage">
              {/* <h1>This is homepage</h1>
              <h1>Welcome to Ratelations</h1> */}
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
   
  
    </>
  );
}

export default App;

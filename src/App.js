import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Login from './components/Login'
import SignUp from './components/SignUp'
import UserPage from './components/UserPage'

class App extends Component {

  render () {
    return (
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route path='/user/:user' component={UserPage} />
      </Router>
    )
  }
}

export default App;

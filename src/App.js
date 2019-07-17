import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import login from "./components/Login/login"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return(
      <Router>
        <div className = "App">
          <Switch>
            <Route exact path = "/" component={login} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';

import wallet from "./components/Wallet/wallet"
import login from "./components/Login/login"
import admin from "./components/Admin/admin"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return(
      <Router>
        <div className = "App">
          <Switch>
            <Route exact path = "/wallet" component={wallet} />
            <Route exact path = "/" component={login} />
            <Route exact path = "/admin" component={admin} />
            
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

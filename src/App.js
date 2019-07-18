import React, {Component} from 'react';
import './App.css';

import wallet from "./components/Wallet/wallet"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return(
      <Router>
        <div className = "App">
          <Switch>
            <Route exact path = "/" component={wallet} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/dashboard" component={FriendsList}/>
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

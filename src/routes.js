import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './scenes/signin';

const Routes = () =>(
  <Router>
    <Switch>
      <Route path="/" component={SignIn} />
    </Switch>
  </Router>
);


export default Routes;
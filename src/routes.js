import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignIn from './scenes/signin';
import MyProfile from './scenes/my-profile/index';


const Routes = ({ token }) =>(
  <Router>
    <Switch>
      <Route path='/me' render={() => (
        token ? <MyProfile/> : <Redirect to='/' />
      )} />
      <Route path='/' component={SignIn} />
    </Switch>
  </Router>
);


export default Routes;
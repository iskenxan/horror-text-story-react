import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignIn from './scenes/signin';
import MyProfile from './scenes/my-profile/index';
import AddStory from './scenes/add-story/index';


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route path={rest.path} {...rest} render ={(props) => (
    rest.token ? <Component {...props} /> : <Redirect to='/'/>
  )}/>
);


const Routes = ({ token }) =>(
  <Router>
    <Switch>
      <PrivateRoute path='/me' token={token} component={MyProfile} />
      <PrivateRoute path='/add-story' token={token} component={AddStory}/>
      <Route path='/' component={SignIn} />
    </Switch>
  </Router>
);


export default Routes;
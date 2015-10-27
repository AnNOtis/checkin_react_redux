import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Checkin from './containers/Checkin';
import NotFound from './containers/NotFound';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>

    <Route path='checkin' component={Checkin}/>

    <Route path='login' component={Login}/>
    <Route path='signup' component={Signup}/>

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
);

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>

    { /* Routes
    <Route onEnter={requireLogin}>
      <Route path='checkin' component={Checkin}/>
    </Route>
    */ }

    <Route path='login' component={Login}/>
    <Route path='signup' component={Signup}/>
    { /* Routes
    */ }

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
);

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
</Route>
);

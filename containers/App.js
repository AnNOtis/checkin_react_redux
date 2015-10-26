import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { loadStorageAuth } from '../actions';
import Header from './Header'
require('../css/root.sass');

@connect(state => ({}), { loadStorageAuth })
export default class App extends Component {
  componentDidMount(){
    this.props.loadStorageAuth();
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <div className='container'>
          {children}
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Header from './Header'
require('../css/root.sass');

@connect(state => ({}))
export default class App extends Component {
  constructor(props) {
    super(props);
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

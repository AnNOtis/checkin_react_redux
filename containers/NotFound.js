import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

require('../css/tool.sass');

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className='tc' style={{fontSize: '48px'}}>404</h1>
        <p className='tc'>Page Not Found</p>
        <p className='tc'><Link to='/'>回到首頁</Link></p>
      </div>
    );
  }
}

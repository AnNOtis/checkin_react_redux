import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
require('../css/header.sass');
require('../css/tool.sass');

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header'>
        <div className='header-wrapper'>
          <Link className='header-column tl' to='/'>首頁</Link>
          <Link className='header-column tc' to='/'>打卡</Link>
          <Link className='header-column tr' to='/login'>登入</Link>
        </div>
      </div>
    );
  }
}

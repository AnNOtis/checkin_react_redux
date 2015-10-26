import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
          <div className='header-column tl'>首頁</div>
          <div className='header-column tc'>打卡</div>
          <div className='header-column tr'>登入</div>
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';
import { logout } from '../actions';
require('../css/header.sass');
require('../css/tool.sass');

@connect((state)=>({auth: state.auth}), { logout })
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderUserStatus() {
    const { auth, logout } = this.props;

    if(!auth.user){
      return(<Link className='header-column tr' to='/login'>登入</Link>);
    } else {
      return (
        <div className='header-column tr' onClick={logout}>
          <span>{auth.user.name} 登出</span>
          <img src={auth.user.avatar.url}/>
        </div>
      );
    }
  }

  render() {
    const { auth } = this.props;

    return (
      <div className='header'>
        <div className='header-wrapper'>
          <Link className='header-column tl' to='/'>首頁</Link>
          <Link className='header-column tc' to='/checkin'>打卡</Link>
          {this.renderUserStatus()}
        </div>
      </div>
    );
  }
}

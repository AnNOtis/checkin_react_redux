import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { connectReduxForm } from 'redux-form';
import LoginForm from '../components/LoginForm';
import { login, loadAuth } from '../actions';
import { isEmpty } from 'lodash';

@connect(state => ({auth: state.auth}), { login, pushState })
export default class Login extends Component {
  componentDidMount(){
    this.redirectIfLogined()
  }

  componentDidUpdate() {
    this.redirectIfLogined()
  }

  redirectIfLogined(){
    const { auth, pushState } = this.props
    if(!isEmpty(auth.user)){
      pushState(null, '/');
    }
  }

  handleSubmit(data) {
    this.props.login(data);
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit.bind(this)} errorMessage={auth.errorMessage}/>
      </div>
    );
  }
}

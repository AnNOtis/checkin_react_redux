import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {connectReduxForm} from 'redux-form';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  handleSubmit(data) {
    debugger
    console.log('Submission received!', data);
    // this.props.dispatch(initialize('contact', {}));
  }

  render() {
    return (
      <div>
        <h1>登入</h1>
        <LoginForm onSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

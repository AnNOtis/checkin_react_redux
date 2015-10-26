import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { isEmpty } from 'lodash';
import SignupForm from '../components/SignupForm';
import { signup } from '../actions';

@connect(state => ({auth: state.auth, signupForm: state.signupForm}), { signup, pushState })
export default class Signup extends Component {
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
    this.props.signup(data);
  }

  render() {
    const { signupForm } = this.props;

    return (
      <div>
        <SignupForm onSubmit={this.handleSubmit.bind(this)} errorMessage={signupForm.errorMessage}/>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {connectReduxForm} from 'redux-form';


function validateLogin(data, props) {
  const errors = {};
  if(!data.email) {
    errors.email = 'Required';
  }
  if(!data.password) {
    errors.password = 'Required';
  }
  return errors;
}

@connectReduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: validateLogin
})
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fields: {email, password},
      handleSubmit
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" {...email}/>
        {email.error && email.touched && <div>{email.error}</div>}

        <label>Password</label>
        <input type="password" {...password}/>
        {password.error && password.touched && <div>{password.error}</div>}

        <button onClick={handleSubmit}>Submit</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectReduxForm } from 'redux-form';
import { isEmpty } from 'lodash';
require('../css/form.sass')
require('../css/button.sass')
require('../css/tool.sass')

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
  renderErrors() {
    const { errorMessage } = this.props;
    if(!isEmpty(errorMessage)){
      return (<div className='error'>{errorMessage}</div>);
    }
  }

  renderInlineError(field) {
    return (field.error && field.touched && <div className='error'>{field.error}</div>)
  }

  render() {
    const {
      fields: {email, password},
      handleSubmit
    } = this.props;

    return (
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-wrapper'>
          <h2>登入</h2>
          {this.renderErrors()}
          <div className='form-field'>
            <label>Email</label>
            <input type="text" {...email}/>
            {this.renderInlineError(email)}
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input type="password" {...password}/>
            {this.renderInlineError(password)}
          </div>
          <div className='form-field tr'>
            <button className='btn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

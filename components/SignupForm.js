import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectReduxForm } from 'redux-form';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';
require('../css/form.sass')
require('../css/button.sass')
require('../css/tool.sass')

function validateSignup(data, props) {
  const errors = {};
  if(!data.name) {
    errors.name = 'Required';
  }

  if(!data.email) {
    errors.email = 'Required';
  }

  if(!data.password) {
    errors.password = 'Required';
  }

  if(data.password != data.passwordConfirmation) {
    errors.passwordConfirmation = 'Confirmation incorrect';
  }

  return errors;
}

@connectReduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'passwordConfirmation', 'avatar'],
  validate: validateSignup
})
export default class SignupForm extends Component {
  handleFileUploadOnChange(e){
    e.preventDefault();
    const { fields } = this.props;
    const files = [ ...e.target.files ];
    return fields.avatar.handleChange(files[0]);
  }

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
      fields: {name, email, password, passwordConfirmation, avatar},
      handleSubmit
    } = this.props;

    return (
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-wrapper'>
          <h2>註冊帳號</h2>
          {this.renderErrors()}
          <div className='form-field'>
            <label>* Name</label>
            <input type='text' {...name}/>
            {this.renderInlineError(name)}
          </div>
          <div className='form-field'>
            <label>* Email</label>
            <input type='text' {...email}/>
            {this.renderInlineError(email)}
          </div>
          <div className='form-field'>
            <label>* Password</label>
            <input type='password' {...password}/>
            {this.renderInlineError(password)}
          </div>
          <div className='form-field'>
            <label>* Password Confirmation</label>
            <input type='password' {...passwordConfirmation}/>
            {this.renderInlineError(passwordConfirmation)}
          </div>
          <div className='form-field'>
            <label>Avatar</label>
            <input type='file' accept='image/*' onChange={this.handleFileUploadOnChange.bind(this)}/>
          </div>
          <div className='form-field tr'>
            <Link className='btn btn--unstyle' to='/login'>back to login</Link>
            <button className='btn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

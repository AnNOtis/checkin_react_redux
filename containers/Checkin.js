import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { connectReduxForm } from 'redux-form';
import { checkin, previewCheckinPhoto, requestLocationPermission } from '../actions';
import { isEmpty } from 'lodash';
require('../css/form.sass')
require('../css/button.sass')
require('../css/tool.sass')

function validateCheckin(data, props) {
  const errors = {};
  if(!data.name) {
    errors.name = 'Required';
  }

  if(data.comment && data.comment.length > 300){
    errors.comment = 'Maxium length 300'
  }
  return errors;
}
@connect((state)=>({ auth: state.auth , checkinForm: state.checkinForm}), {checkin, previewCheckinPhoto, requestLocationPermission, replaceState})
@connectReduxForm({
  form: 'checkin',
  fields: ['name', 'comment', 'photo'],
  validate: validateCheckin
})
export default class Checkin extends Component {
  componentDidMount() {
    this.requireLogin();
    this.props.requestLocationPermission();
  }

  requireLogin() {
    const { auth: { user }, replaceState} = this.props;

    if (!user) {
      replaceState(null, '/login');
    }
  }

  handleFileUploadOnChange(e){
    e.preventDefault();
    const { fields } = this.props;
    const files = [ ...e.target.files ];
    if (files && files.length > 0) {
      const file = files[0];
      try {
        const imgURL = window.URL.createObjectURL(file);
        this.props.previewCheckinPhoto(imgURL);
        setTimeout(function(){URL.revokeObjectURL(imgURL);}, 0);
      }
      catch (e) {
        try {
          const fileReader = new FileReader();
          fileReader.onload = function (event) {
            showPicture.src = event.target.result;
          };
          fileReader.readAsDataURL(file);
        } catch (e) {
          console.warn(e);
        }
      }
      return fields.photo.handleChange(files[0]);
    }
  }

  saveForm(data){
    this.props.checkin(data);
  }

  renderErrors() {
    const { checkinForm: { errorMessage } } = this.props;
    if(!isEmpty(errorMessage)){
      return (<div className='error'>{errorMessage}</div>);
    }
  }

  renderInlineError(field) {
    return (field.error && field.touched && <div className='error'>{field.error}</div>)
  }

  render() {
    const {
      fields: {name, comment},
      checkinForm: {previewPhoto},
      handleSubmit
    } = this.props;

    return (
      <form className='form' onSubmit={handleSubmit(this.saveForm.bind(this))}>
        <div className='form-wrapper'>
          <h2>打卡</h2>
          {this.renderErrors()}
          <div className='form-field'>
            <label>* Name</label>
            <input type='text' {...name}/>
            {this.renderInlineError(name)}
          </div>
          <div className='form-field'>
            <label>Comment</label>
            <textarea {...comment}/>
            {this.renderInlineError(comment)}
          </div>
          <div className='form-field'>
            <label>Photo</label>
            <input type='file' accept='image/*' onChange={this.handleFileUploadOnChange.bind(this)}/>
            {previewPhoto && <img src={previewPhoto}/>}
          </div>
          <div className='form-field tr'>
            <button className='btn' onClick={handleSubmit(this.saveForm.bind(this))}>Checkin</button>
          </div>
        </div>
      </form>
    );
  }
}

Checkin.propTypes = {
  fields: PropTypes.object.isRequired,
}

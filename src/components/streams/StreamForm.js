import React, { Component } from 'react';
import {Field,reduxForm} from 'redux-form'


class StreamForm extends Component {

  renderError({error,touched})
  {
      if(touched && error)
      {
        return(
          <div className='ui error message'>
            <div className='header'>{error}</div>
          </div>
        )
      }
  }


  renderInput=({input,label,meta})=>{
    //console.log(meta);
    //const className=`field ${meta.error && meta.touched ? 'error':''}`
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} placeholder={label}  autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues)=>{
    //console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    //console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui primary button">
          Submit
        </button>
      </form>
    );
  }
}


const validate = (formValues)=>{
  const errors = {}; // array of object
  if (!formValues.title) {
    errors.title = 'Required'
  }
  if (!formValues.description) {
    errors.description = 'Required'
  }
  return errors;
}

export default reduxForm({
  form: 'streamForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(StreamForm);



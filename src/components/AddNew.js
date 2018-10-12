import React from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import { FormErrors } from './FormErrors';

class AddNew extends React.Component {
  constructor(props){
  	super(props);

    this.state={
      toDash:false,
      name: "",
      email: "",
      phone: "",
      formErrors: {name:"", email:"", phone:""},
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false
    };

    this.onChange = this.onChange.bind(this);
    this.savePerson = this.savePerson.bind(this);
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  	this.setState({ [name]: value }, 
        () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (value.length >= 1){
          fieldValidationErrors.email = emailValid ? '' : 'Sähköposti on virheellinen';
        } else {
          fieldValidationErrors.email = 'Sähköposti on pakollinen';
        }
        break;
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '': 'Nimi on pakollinen';
        break;
      case 'phone':
        phoneValid = value.match(/^[\d ]+$/);
        if (value.length >= 1){
          fieldValidationErrors.phone = phoneValid ? '' : 'Puhelin numero on virheellinen';
        } else {
          fieldValidationErrors.phone = 'Puhelin numero on pakollinen';
        }
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
              emailValid: emailValid,
              nameValid: nameValid,
              phoneValid: phoneValid

    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.nameValid && this.state.phoneValid});
  }

  savePerson = () => {
	
    const { error, toDash, ...newPerson } = this.state;
    this.props.saveNew(newPerson);
    this.setState({toDash: true});
  }

  render(){

    if(this.state.toDash===true){
      return <Redirect to='/' />
    }

    return (
      <form onSubmit={this.savePerson}>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="row" key="name">
          <label htmlFor="newName">Nimi</label>
          <input className="form-control" name="name" id="newName" type="text" value={this.state.name} onChange={this.onChange} required />
        </div>
        <div className="row" key="email">
          <label htmlFor="newEmail">Sähköposti</label>
          <input className="form-control" name="email" id="newEmail" type="email" value={this.state.email} onChange={this.onChange} required />
        </div>
        <div className="row" key="phone">
          <label htmlFor="newPhone">Puhelin</label>
          <input className="form-control" name="phone" id="newPhone" type="text" value={this.state.phone} 
            pattern="[0-9 ]{8,12}" placeholder="Muodossa 123 123 123" onChange={this.onChange} required /><br /><br />
        </div>
        <div className="row" key="button">
          <button type="button" className="btn btn-primary" disabled={!this.state.formValid} onClick={this.savePerson}>Tallenna</button>{" "}
          <Link to="/"><button className="btn btn-secondary" type="button">Peruuta</button></Link>
        </div>
      </form>
    )
  }
}

AddNew.propTypes = {
	saveNew: PropTypes.func,
}

export default AddNew;
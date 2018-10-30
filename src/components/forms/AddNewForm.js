import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../fields/InlineError';

class AddNewForm extends React.Component {
  constructor(props){
  	super(props);

    this.state={
      data: {
        name: "",
        email: "",
        phone: ""
      },
      loading: false,
      errors: {}
    };
  }

  onChange = e => 
    this.setState({ 
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0){
      // this.setState({ loading: true }); waiting for database

      // normally this would go to database, but right now only localstorage
      this.props.submit(this.state.data);
      //  .catch(err => this.setState({ errors: err.response.data.errors, loading: false })); waiting for database
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Nimi on pakollinen";
    if (!Validator.isEmail(data.email)) errors.email = "Virheellinen email";
    if (!data.phone.match(/^[\d ]+$/)){
      errors.phone = "Virheellinen puhelin";
    }
    return errors;
  };

  render() {

    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        { errors.global && <Message negative>
          <Message.Header>Something wrong</Message.Header>
          <p>{ errors.global }</p>
          </Message>
        }
        <Form.Field error={!!errors.name}>
          <label htmlFor="name">Nimi</label>
          <input 
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={this.onChange} />
            { errors.name && <InlineError text={errors.name} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange} />
            { errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.phone}>
          <label htmlFor="name">Puhelin</label>
          <input 
            type="text"
            id="phone"
            name="phone"
            placeholder="Muodossa 111 222 333"
            value={data.phone}
            onChange={this.onChange} />
            { errors.phone && <InlineError text={errors.phone} />}
        </Form.Field>
        <Button primary>Tallenna</Button>
        <Link to="/"><Button secondary>Peruuta</Button></Link>
      </Form>
    )
  }
}

AddNewForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default AddNewForm;
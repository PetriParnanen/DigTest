import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../fields/InlineError';

export const ValidatePerson = (data) => {
  const errors = {};
  if (!data.name) errors.name = "Nimi on pakollinen";
  if (!Validator.isEmail(data.email)) errors.email = "Virheellinen email";
  if (!data.phone.match(/^[\d ]+$/)){
    errors.phone = "Virheellinen puhelin";
  }
  return errors;
};

class AddNewForm extends React.Component {
  state={
    data: {
      name: "",
      email: "",
      phone: ""
    },
    loading: false,
    errors: {}
  }

  onChange = e => {
    const { data } = this.state;
    this.setState({ 
      data: { ...data, [e.target.name]: e.target.value }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = ValidatePerson(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0){
      this.setState({ loading: true });

      const { submit } = this.props;
      submit(data);
    }
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
          <label htmlFor="name">Nimi
          <input 
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={this.onChange} />
          </label>
            { errors.name && <InlineError text={errors.name} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email
          <input 
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange} />
          </label>
            { errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.phone}>
          <label htmlFor="phone">Puhelin
          <input 
            type="text"
            id="phone"
            name="phone"
            placeholder="Muodossa 111 222 333"
            value={data.phone}
            onChange={this.onChange} />
          </label>
            { errors.phone && <InlineError text={errors.phone} />}
        </Form.Field>
        <Button primary>Tallenna</Button>
        <Link to="/persons"><Button secondary>Peruuta</Button></Link>
      </Form>
    )
  }
}

AddNewForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default AddNewForm;
import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import InlineError from '../fields/InlineError';

export const ValidatePerson = (data, intl ) => {
  const errors = {};
  if (!data.name) errors.name = intl.formatMessage({ id: 'error.mandatoryname'});
  if (!Validator.isEmail(data.email)) errors.email = intl.formatMessage({ id: 'error.email'});
  if (!data.phone.match(/^[\d ]+$/)){
    errors.phone = intl.formatMessage({ id: 'error.phone' });
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
    const { intl } = this.props;
    const errors = ValidatePerson(data, intl);
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
          <Message.Header>
            <FormattedMessage id="new.globalerror" defaultMessage="Database error" />
          </Message.Header>
          <p>{ errors.global }</p>
          </Message>
        }
        <Form.Field error={!!errors.name}>
          <label htmlFor="name">
            <FormattedMessage id="new.name" defaultMessage="Name" />
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
          <label htmlFor="email">
            <FormattedMessage id="new.email" defaultMessage="Email" />
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
          <label htmlFor="phone">
            <FormattedMessage id="new.phone" defaultMessage="Phonenumber" />
          <input 
            type="text"
            id="phone"
            name="phone"
            placeholder="111 222 333"
            value={data.phone}
            onChange={this.onChange} />
          </label>
            { errors.phone && <InlineError text={errors.phone} />}
        </Form.Field>
        <Button primary>
          <FormattedMessage id="new.savebutton" defaultMessage="Save" />
        </Button>
        <Link to="/persons"><Button secondary>
          <FormattedMessage id="new.cancelbutton" defaultMessage="Cancel" />
        </Button></Link>
      </Form>
    )
  }
}

AddNewForm.propTypes = {
	submit: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(AddNewForm);
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddNewForm from '../forms/AddNewForm';
import { createContact } from '../../actions/contacts';

class AddNewPage extends React.Component {
  addContact = (data) => {
    const { createContactAction, history, fetchId } = this.props;
    const newData = data;
    newData.id = fetchId();
    createContactAction(newData).then(() => history.push("/persons"));
  }

  render(){
    return (
      <div>
        <h1>
          <FormattedMessage id="new.title" defaultMessage="Add new contact" />
        </h1>

        <AddNewForm submit={this.addContact} />
      </div>
    );
  }
}

AddNewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchId: PropTypes.func.isRequired,
  createContactAction: PropTypes.func.isRequired
};

export default connect(null, { createContactAction: createContact })(AddNewPage);
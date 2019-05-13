import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddNewForm from '../forms/AddNewForm';
import { createContact } from '../../actions/contacts';

class AddNewPage extends React.Component {
  submit = (data) => {
    const { cContact, history, fetchId } = this.props;
    const newData = data;
    newData.id = fetchId();
    cContact(newData).then(() => history.push("/persons"))
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        <h1>Lisää uusi</h1>

        <AddNewForm submit={this.submit} />
      </div>
    );
  }
}

AddNewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchId: PropTypes.func.isRequired,
  cContact: PropTypes.func.isRequired
};

export default connect(null, { cContact: createContact })(AddNewPage);
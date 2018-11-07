import React from 'react';
import PropTypes from 'prop-types';
import AddNewForm from '../forms/AddNewForm';

class AddNewPage extends React.Component {
  submit = (data) => {
    const { addNew, history } = this.props;
    addNew(data);
    history.push("/persons");
    // this.props.addNew(data).then(() => this.props.history.push("/")); waiting for database
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
  addNew: PropTypes.func.isRequired
};

export default AddNewPage;
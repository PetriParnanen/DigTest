import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import preData from '../generatedValues.json';
import AddNew from './AddNewPage';
import ListPerson from '../fields/PersonList';
import { ValidatePerson } from '../forms/AddNewForm';
import ConfirmEmailMessage from '../fields/ConfirmEmailMessage';

class PersonListPage extends React.Component {
  constructor(props) {
    super(props);

    this.values = [];

    // state will keep sort terms, which table is under edit and values shown. gotta remove error
    this.state = {
      sortBy: {dir: 'desc', field: 'id'},
      values: preData,
      errors: {}
    }

    this.reSort = this.reSort.bind(this);
  }

  // save new sort order
  reSort = (field) => {
    const { sortBy } = this.state;
    if (sortBy.field !== field){
      this.setState({sortBy: {dir: 'desc', field }})
    } else {
      const newDir = (sortBy.dir==="desc"?"asc":"desc");
      this.setState({sortBy: {dir: newDir, field }})
    }
  }

  // delete row
  // Will remove by filtering out the deletable row and save rest back to state
  deleteRow = (rowId) => {
    const { values } = this.state;
    const newValues = values.filter(a => a.id !== rowId);
    this.setState({values: newValues});
  }

  onEdit = (rowId, field, e) => {
    const { values, errors } = this.state;
    const newPerson = values.find(a => a.id === rowId);
    newPerson[field] = e.target.value;


    // error check
    errors[newPerson.id] = ValidatePerson(newPerson);

    this.setState({ values, errors });
  }

  // will save new row to values
  saveNew = (person) => {
    const newPerson = person;

    // getting the biggest id and add one
    const { values } = this.state;
    newPerson.id = Math.max(...values.map((e) => e.id))+1;

    // add new person to list and save new list
    values.push(newPerson);
    console.log("HERE");
    this.setState({values});
  }

  render() {

    const { values, sortBy, errors } = this.state;
    const { logout, isConfirmed } = this.props;

    return (
        <div>

          {!isConfirmed ? (
             <ConfirmEmailMessage />
          ) : (
            <main>
              <Route exact path='/persons' render={(props) => (<ListPerson {...props} oldValues={values} onEdit={this.onEdit} deleteRow={this.deleteRow}
                sortBy={sortBy} reSort={this.reSort} errors={errors} logout={logout} /> )} />
          	 <Route exact path='/persons/addNew' render={(props) => (<AddNew {...props} addNew={this.saveNew} /> )} />
            </main>
          )}
        </div>
    );
  }
}

PersonListPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed
	}	
}

export default connect(mapStateToProps, { logout: actions.logout })(PersonListPage);
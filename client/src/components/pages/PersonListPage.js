import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';
import AddNew from './AddNewPage';
import ListPerson from '../fields/PersonList';
import { ValidatePerson } from '../forms/AddNewForm';
import ConfirmEmailMessage from '../fields/ConfirmEmailMessage';
import { allContactsSelector } from '../../reducers/contact';
import { fetchContacts } from '../../actions/contacts';

class PersonListPage extends React.Component {
  state = {
    sortBy: {dir: 'desc', field: 'id'},
    errors: {}
  }

  // Load contacts on component load from database
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchContacts();


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
    const { contacts } = this.props;
    const newValues = contacts.filter(a => a.id !== rowId);
    this.setState({values: newValues});
  }

  onEdit = (rowId, field, e) => {
    const { errors } = this.state;
    const { contacts } = this.props;
    const newPerson = contacts.find(a => a.id === rowId);
    newPerson[field] = e.target.value;

    // error check
    errors[newPerson.id] = ValidatePerson(newPerson);

    this.setState({ errors });
  }

  // getting the biggest id and add one
  fetchNewId = () => {
    const { contacts } = this.props;
    return ( contacts.length===0 ? 0 : Math.max(...contacts.map((e) => e.id))) +1;
  }

  // will save new row to values
  /* saveNew = (person) => {
    const newPerson = person;

    // getting the biggest id and add one
    const { values } = this.state;
    // newPerson.id = ( values.length===0 ? 0 : Math.max(...values.map((e) => e.id))) +1;

    // add new person to list and save new list
    values.push(newPerson);
    this.setState({values});
  } */

  render() {

    const { sortBy, errors } = this.state;
    const { contacts, logout, isConfirmed } = this.props;

    return (
        <div>

          {!isConfirmed ? (
             <ConfirmEmailMessage />
          ) : (
            <main>
              <Route exact path='/persons' render={(props) => (<ListPerson {...props} oldValues={contacts} onEdit={this.onEdit} deleteRow={this.deleteRow}
                sortBy={sortBy} reSort={this.reSort} errors={errors} logout={logout} /> )} />
          	 <Route exact path='/persons/addNew' render={(props) => (<AddNew {...props} fetchId={this.fetchNewId} /> )} />
            </main>
          )}
        </div>
    );
  }
}

PersonListPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  fetchContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed,
    contacts: allContactsSelector(state)
	}	
}

export default connect(mapStateToProps, { logout: actions.logout, fetchContacts })(PersonListPage);
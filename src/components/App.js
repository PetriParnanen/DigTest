import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import preData from './generatedValues.json';
import AddNew from './pages/AddNewPage';
import ListPerson from './fields/PersonList';
import { ValidatePerson } from './forms/AddNewForm';

class App extends Component {
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
    this.setState({values});
  }

  render() {

    const { values, sortBy, errors } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Henkilölista</h1>
        </header>
        <div className="ui container">
        <main>
          <Route exact path='/' render={(props) => (<ListPerson {...props} oldValues={values} onEdit={this.onEdit} deleteRow={this.deleteRow}
            sortBy={sortBy} reSort={this.reSort} errors={errors} /> )} />
          <Route path='/addNew' render={(props) => (<AddNew {...props} addNew={this.saveNew} /> )} />
        </main>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import preData from './generatedValues.json';
import {Route} from 'react-router-dom';
import AddNew from './AddNew';
import ListPerson from './PersonList';

class App extends Component {
  constructor(props) {
    super(props);

    this.values = [];

    //state will keep sort terms, which table is under edit and values shown
    this.state = {
      sortBy: {dir: 'desc', field: 'id'},
      values: preData,
    }

    this.reSort = this.reSort.bind(this);
  }

  //save new sort order
  reSort = (field) => {
    if (this.state.sortBy.field !== field){
      this.setState({sortBy: {dir: 'desc', field: field }})
    } else {
      const newDir = (this.state.sortBy.dir==="desc"?"asc":"desc");
      this.setState({sortBy: {dir: newDir, field: field}})
    }
  }

  //delete row
  //Will remove by filtering out the deletable row and save rest back to state
  deleteRow = (rowId) => {
    const newValues = this.state.values.filter(a => a.id !== rowId);
    this.setState({values: newValues});
  }

  //sets field so it can be edited
  setEditable = (rowId, field) => {
    this.setState({editable: {id: rowId, field: field}, error:""});
  }

  onEdit = (rowId, field, e) => {
    //this works fine with this small list, but this ain't probably the best solution for bigger lists
    let newValues = this.state.values;
    newValues.find(a => a.id === rowId)[field] = e.target.value;

    this.setState({values: newValues, error: e.target.validationMessage});
  }

  //will save new row to values
  saveNew = (newPerson) => {
    // getting the biggest id and add one
    let newValues = this.state.values;
    newPerson.id = Math.max(...newValues.map((e) => e.id))+1;

    //add new person to list and save new list
    newValues.push(newPerson);
    this.setState({values: newValues});
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Henkilölista</h1>
        </header>
        
        <font color="red">{this.state.error}</font>
 
        <main>
          <Route exact path='/' render={(props) => (<ListPerson {...props} values={this.state.values} onEdit={this.onEdit} deleteRow={this.deleteRow}
            sortBy={this.state.sortBy} reSort={this.reSort} /> )} />
          <Route path='/addNew' render={(props) => (<AddNew {...props} saveNew={this.saveNew} /> )} />
        </main>
      </div>
    );
  }
}

export default App;

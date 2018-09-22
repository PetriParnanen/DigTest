import React, { Component } from 'react';
import preData from './generatedValues.json';
import {Route} from 'react-router-dom';
import AddNew from './AddNew';

class App extends Component {
  constructor(props) {
    super(props);

    this.values = [];

    //state will keep sort terms, which table is under edit and values shown
    this.state = {
      sortBy: {dir: 'desc', field: 'id'},
      editable: {},
      values: preData,
    }

    this.reSort = this.reSort.bind(this);
  }

  // this will sort values based on sortBy state
  sortValues = () => {
    // using typeof to decide how to sort, could do more types but keep it simple
    if (typeof this.state.values[0][this.state.sortBy.field] === 'number') {
      this.values = this.state.values.sort((a,b) => {
        return this.state.sortBy.dir==="desc"?
        a[this.state.sortBy.field] - b[this.state.sortBy.field]:
        -( a[this.state.sortBy.field] - b[this.state.sortBy.field] )
      })
    } else {
      this.values = this.state.values.sort((a,b) => {
        return this.state.sortBy.dir==="desc"?
          a[this.state.sortBy.field].localeCompare(b[this.state.sortBy.field]):
          -( a[this.state.sortBy.field].localeCompare(b[this.state.sortBy.field]) )
      })
    }
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
    console.log(newPerson);
  }

  render() {
    this.sortValues();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Henkilölista</h1>
        </header>
        
        <font color="red">{this.state.error}</font>
 
        <main>
          <Route exact path='/' render{() => (
        <div className="listTable">
          <div className="listRow" key="headerRow">
            <div className="listTableCell" key="id" onClick={() => this.reSort("id")} id="id"><b>Id</b></div>
            <div className="listTableCell" key="name" onClick={() => this.reSort("name")} id="name"><b>Nimi</b></div>
            <div className="listTableCell" key="email" onClick={() => this.reSort("email")} id="email"><b>Sähköposti</b></div>
            <div className="listTableCell" key="phone" onClick={() => this.reSort("phone")} id="phone"><b>Puhelin</b></div>
          </div>
        {this.values && this.values.map(val => 
          <div className="listRow" key={val.id}>
            <div className="listTableCell" key="id">{val.id}</div>
            <Editable 
              editField={this.state.editable} field={"name"} rowId={val.id} value={val.name} 
              onChange={this.onEdit} setEdit={this.setEditable} />
            <Editable 
              editField={this.state.editable} field={"email"} rowId={val.id} value={val.email} 
              onChange={this.onEdit} setEdit={this.setEditable} />
            <Editable 
              editField={this.state.editable} field={"phone"} rowId={val.id} value={val.phone} 
              onChange={this.onEdit} setEdit={this.setEditable} />
            <div className="listTableCell" key="delete">
              <img src="./pics/trash.png" alt="poista" className="thrash" onClick={() => this.deleteRow(val.id)} />
            </div>
          </div>
        )}
        </div>
        <br /><a href="/addNew" className="button center">Lisää uusi</a>
        )}
          <Route path='/addNew' render={() => (<AddNew saveNew={this.saveNew} /> )} />
        </main>
      </div>
    );
  }
}

// this gives either editable text field or just value field
const Editable = ({editField, field, rowId, value, onChange, setEdit}) => {
  const type = (field==="email"?'email':'text');
  if(editField.id===rowId && editField.field===field){
    return (
      <div className="listTableCell" key="name">
      {field === "phone"?(
        <input type={type} name={field} value={value} pattern="[0-9 ]{8,12}" placeholder="Muodossa 123 123 123"
          onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      ):(
        <input type={type} name={field} value={value} onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      )
      }
      </div>
    )
  } else {
    return (
      <div className="listTableCell" key="name" onClick={() => setEdit(rowId, field)}>{value}</div>
    )
  }
}

export default App;

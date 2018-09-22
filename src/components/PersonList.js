import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

class PersonList extends React.Component {
  constructor(props){
	super(props);

	this.values=[];

	this.state ={
  	  editable: {},
    }
  }

  // this will sort values based on sortBy state
  sortValues = () => {
    // using typeof to decide how to sort, could do more types but keep it simple
    if (typeof this.props.values[0][this.props.sortBy.field] === 'number') {
      this.values = this.props.values.sort((a,b) => {
        return this.props.sortBy.dir==="desc"?
        a[this.props.sortBy.field] - b[this.props.sortBy.field]:
        -( a[this.props.sortBy.field] - b[this.props.sortBy.field] )
      })
    } else {
      this.values = this.props.values.sort((a,b) => {
        return this.props.sortBy.dir==="desc"?
          a[this.props.sortBy.field].localeCompare(b[this.props.sortBy.field]):
          -( a[this.props.sortBy.field].localeCompare(b[this.props.sortBy.field]) )
      })
    }
  }

  //sets field so it can be edited
  setEditable = (rowId, field) => {
    this.setState({editable: {id: rowId, field: field}, error:""});
  }

/*      <div className="listTable" key="new">
      	<a href="/addNew" className="button center">Lisää uusi</a>
      </div>*/
  render(){
    this.sortValues();

    return (
	  <div className="listTable" key="list">
        <div className="listRow" key="headerRow">
          <div className="listTable">
            <div className="listRow" key="header">
              <div className="listTableCell" key="id" onClick={() => this.props.reSort("id")} id="id"><b>Id</b></div>
              <div className="listTableCell" key="name" onClick={() => this.props.reSort("name")} id="name"><b>Nimi</b></div>
              <div className="listTableCell" key="email" onClick={() => this.props.reSort("email")} id="email"><b>Sähköposti</b></div>
              <div className="listTableCell" key="phone" onClick={() => this.props.reSort("phone")} id="phone"><b>Puhelin</b></div>
            </div>
          {this.props.values && this.props.values.map(val => 
            <div className="listRow" key={val.id}>
              <div className="listTableCell" key="id">{val.id}</div>
              <Editable 
                editField={this.state.editable} field={"name"} rowId={val.id} value={val.name} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
              <Editable 
                editField={this.state.editable} field={"email"} rowId={val.id} value={val.email} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
              <Editable 
                editField={this.state.editable} field={"phone"} rowId={val.id} value={val.phone} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
              <div className="listTableCell" key="delete">
                <img src="./pics/trash.png" alt="poista" className="thrash" onClick={() => this.props.deleteRow(val.id)} />
              </div>
            </div>
          )}
          </div>
        </div>
      	<div className="listRow" key="add">
      	  <div className="listTableCell"><br /><Link to="/addNew" className="button center">Lisää uusi</Link></div>
      	</div>
      </div>

    )
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
        

PersonList.propTypes = {
	values: PropTypes.array,
	onEdit: PropTypes.func,
	deleteRow: PropTypes.func,
	sortBy: PropTypes.object,
	reSort: PropTypes.func,
}

export default PersonList;
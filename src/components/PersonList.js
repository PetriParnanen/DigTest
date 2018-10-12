import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { Editable } from './Editable';
import { sortValues } from './Sorter';

class PersonList extends React.Component {
  constructor(props){
	super(props);

	this.values=[];

	this.state ={
  	  editable: {},
    }
  }

  //sets field so it can be edited
  setEditable = (rowId, field) => {
    this.setState({editable: {id: rowId, field: field}, error:""});
  }

  render(){
    this.values = sortValues(this.props.values, this.props.sortBy);

    let image = "./pics/"+(this.props.sortBy.dir === "asc"?"uparrow.png":"downarrow.png");

    return (
      <div>
        <div className="row" key="header">
          <div className="col-md-1 hover" key="id" onClick={() => this.props.reSort("id")} id="id"><b>Id</b>
            {this.props.sortBy.field==="id" &&
              <img src={image} className="arrow" alt="arrow" />
            }
          </div>
          <div className="col-md-3 hover" key="name" onClick={() => this.props.reSort("name")} id="name"><b>Nimi</b>
            {this.props.sortBy.field==="name" &&
              <img src={image} className="arrow" alt="arrow" />
            }
          </div>
          <div className="col-md-4 hover" key="email" onClick={() => this.props.reSort("email")} id="email"><b>Sähköposti</b>
            {this.props.sortBy.field==="email" &&
              <img src={image} className="arrow" alt="arrow" />
            }
          </div>
          <div className="col-md-3 hover" key="phone" onClick={() => this.props.reSort("phone")} id="phone"><b>Puhelin</b>
            {this.props.sortBy.field==="phone" &&
              <img src={image} className="arrow" alt="arrow" />
            }
          </div>
        </div>
      {this.props.values && this.props.values.map(val => 
        <div className="row" key={val.id}>
          <div className="col-md-1" key="id">{val.id}</div>
          <Editable 
            editField={this.state.editable} field={"name"} rowId={val.id} value={val.name} 
            onChange={this.props.onEdit} setEdit={this.setEditable} />
          <Editable 
            editField={this.state.editable} field={"email"} rowId={val.id} value={val.email} 
            onChange={this.props.onEdit} setEdit={this.setEditable} />
          <Editable 
            editField={this.state.editable} field={"phone"} rowId={val.id} value={val.phone} 
            onChange={this.props.onEdit} setEdit={this.setEditable} />
          <div className="col-md-1" key="delete">
            <img src="./pics/trash.png" alt="poista" className="thrash hover" onClick={() => this.props.deleteRow(val.id)} />
          </div>
        </div>
      )}
        <div className="row" key="add">
          <div className="col-md-12"><br />
            <Link to="/addNew"><button type="button" className="btn btn-primary">Lisää uusi</button></Link>
          </div>
        </div>
      </div>
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
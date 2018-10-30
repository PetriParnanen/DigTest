import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import { Editable } from './Editable';
import { SortValues } from '../scripts/Sorter';

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
    this.values = SortValues(this.props.values, this.props.sortBy);

    let image = "./pics/"+(this.props.sortBy.dir === "asc"?"uparrow.png":"downarrow.png");

    return (
      <div>
        <Grid columns={5}>
          <Grid.Row key="header">
            <Grid.Column width={1} className="hover" onClick={() => this.props.reSort("id")}><b>Id</b>{"  "}
              {this.props.sortBy.field==="id" &&
                <img src={image} className="arrow" alt="arrow" />
              }
            </Grid.Column>
            <Grid.Column width={5} className="hover" onClick={() => this.props.reSort("name")}><b>Nimi</b>{"  "}
              {this.props.sortBy.field==="name" &&
                <img src={image} className="arrow" alt="arrow" />
              }
            </Grid.Column>
            <Grid.Column width={5} className="hover" onClick={() => this.props.reSort("email")}><b>Sähköposti</b>{"  "}
              {this.props.sortBy.field==="email" &&
                <img src={image} className="arrow" alt="arrow" />
              }
            </Grid.Column>
            <Grid.Column width={3} className="hover" onClick={() => this.props.reSort("phone")}><b>Puhelin</b>{"  "}
              {this.props.sortBy.field==="phone" &&
                <img src={image} className="arrow" alt="arrow" />
              }
            </Grid.Column>
          </Grid.Row>
        {this.props.values && this.props.values.map(val => (
          <Grid.Row key={val.id} className="noPadding"> 
            <Grid.Column key="id" width={1}>{val.id}</Grid.Column>
            <Grid.Column key="name" width={5}>
              <Editable 
                editField={this.state.editable} field={"name"} rowId={val.id} value={val.name} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
            </Grid.Column>
            <Grid.Column key="email" width={5}>
              <Editable 
                editField={this.state.editable} field={"email"} rowId={val.id} value={val.email} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
            </Grid.Column>
            <Grid.Column key="phone" width={3}>
              <Editable 
                editField={this.state.editable} field={"phone"} rowId={val.id} value={val.phone} 
                onChange={this.props.onEdit} setEdit={this.setEditable} />
            </Grid.Column>
            <Grid.Column key="delete" width={2}>
              <img src="./pics/trash.png" alt="poista" className="thrash hover" onClick={() => this.props.deleteRow(val.id)} />
            </Grid.Column>
          </Grid.Row>
        ))}
          <Grid.Row columns={1} key="button">
            <Grid.Column key="button">
              <Link to="/addNew"><Button primary>Lisää uusi</Button></Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
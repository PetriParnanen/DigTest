import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Grid, Button, Image } from 'semantic-ui-react';
import { Editable } from './Editable';
import { SortValues } from '../scripts/Sorter';
import InlineError from './InlineError';

class PersonList extends React.Component {
  constructor(props){
	super(props);

	this.values=[];

	this.state ={
  	  editable: {},
    }
  }

  // sets field so it can be edited
  setEditable = (id, field) => {
    this.setState( { editable: {id, field} } );
  }

  render(){
    const { oldValues, sortBy, reSort, onEdit, deleteRow, errors } = this.props;
    const { editable } = this.state;
    this.values = SortValues(oldValues, sortBy);

    const image = `./pics/${ sortBy.dir === "asc"?"uparrow.png":"downarrow.png" }`;

    return (
      <div>
        <Grid columns={5}>
          <Grid.Row key="header">
            <Grid.Column width={1} className="hover" onClick={() => reSort("id")}><b>Id</b>{"  "}
              {sortBy.field==="id" &&
                <Image src={image} className="arrow" alt="arrow" inline />
              }
            </Grid.Column>
            <Grid.Column width={5} className="hover" onClick={() => reSort("name")}><b>Nimi</b>{"  "}
              {sortBy.field==="name" &&
                <Image src={image} className="arrow" alt="arrow" inline />
              }
            </Grid.Column>
            <Grid.Column width={5} className="hover" onClick={() => reSort("email")}><b>Sähköposti</b>{"  "}
              {sortBy.field==="email" &&
                <Image src={image} className="arrow" alt="arrow" inline />
              }
            </Grid.Column>
            <Grid.Column width={3} className="hover" onClick={() => reSort("phone")}><b>Puhelin</b>{"  "}
              {sortBy.field==="phone" &&
                <Image src={image} className="arrow" alt="arrow" inline />
              }
            </Grid.Column>
          </Grid.Row>
        {this.values && this.values.map(val => (
          <Grid.Row key={val.id} className="noPadding"> 
            <Grid.Column key="id" width={1}>{val.id}</Grid.Column>
            <Grid.Column key="name" width={5}>
              <Editable 
                editField={editable} field="name" rowId={val.id} value={val.name} 
                onChange={onEdit} setEdit={this.setEditable} />
                { errors[val.id] && errors[val.id].name && 
                  <InlineError text={errors[val.id].name} />}
            </Grid.Column>
            <Grid.Column key="email" width={5}>
              <Editable 
                editField={editable} field="email" rowId={val.id} value={val.email} 
                onChange={onEdit} setEdit={this.setEditable} />
                { errors[val.id] && errors[val.id].email && 
                  <InlineError text={errors[val.id].email} />}
            </Grid.Column>
            <Grid.Column key="phone" width={3}>
              <Editable 
                editField={editable} field="phone" rowId={val.id} value={val.phone} 
                onChange={onEdit} setEdit={this.setEditable} />
                { errors[val.id] && errors[val.id].phone && 
                  <InlineError text={errors[val.id].phone} />}
            </Grid.Column>
            <Grid.Column key="delete" width={2}>
              <Image src="./pics/trash.png" alt="poista" className="thrash hover" onClick={() => deleteRow(val.id)} />
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
	oldValues: PropTypes.instanceOf(Array).isRequired,
	onEdit: PropTypes.func.isRequired,
	deleteRow: PropTypes.func.isRequired,
	sortBy: PropTypes.instanceOf(Object).isRequired,
	reSort: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired
}

export default PersonList;
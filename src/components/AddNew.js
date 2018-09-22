import React from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

class AddNew extends React.Component {
  constructor(props){
  	super(props);

    this.state={
      toDash:false,
      name: "",
      email: "",
      phone: "",
      error: ""
    };

    this.onChange = this.onChange.bind(this);
    this.savePerson = this.savePerson.bind(this);
  }

  onChange = (e) => {
  	this.setState({ [e.target.name]: e.target.value, error: e.target.validationMessage });
  }

  savePerson = () => {

  	//tarkistetaan pakolliset tiedot ja onko email/puhelin oikein kirjoitettuja
  	if (this.state.name === null || this.state.name === "" ||
  	  this.state.email === null || this.state.email === "" ||
  	  this.state.phone === null || this.state.phone === ""){
  	  this.setState({error: "Kaikki kentät ovat pakollisia"});
  	} else if (!/^[\w.]+@[\w.]+.\w{2,4}$/.test(this.state.email)) {
  		this.setState({error: "Virheellinen sähköposti osoite"})
  	} else if (!/^[\d ]+$/.test(this.state.phone)){
  		this.setState({error: "Virheellinen puhelin numero"})
  	} else {
      const { error, toDash, ...newPerson } = this.state;
      this.props.saveNew(newPerson);
      this.setState({toDash: true});
    }
  }

  render(){

    if(this.state.toDash===true){
      return <Redirect to='/' />
    }

    return (
      <div className="listTable" key="add">
        <div className="listRow" key="error">
          <div className="listTableCell"><font color="red">{this.state.error}</font></div>
        </div>
        <div className="listRow" key="form">
          <div className="listTableCell" key="form">
            <div className="listTable">
              <div className="listRow" key="name">
                <div className="listTableCell" key="label">Nimi:</div>
                <div className="listTableCell" key="field"><input name="name" type="text" value={this.state.name} onChange={this.onChange} required /></div>
              </div>
              <div className="listRow" key="email">
                <div className="listTableCell" key="label">Sähköposti:</div>
                <div className="listTableCell" key="field"><input name="email" type="email" value={this.state.email} onChange={this.onChange} required /></div>
              </div>
              <div className="listRow" key="phone">
                <div className="listTableCell" key="label">Puhelin:</div>
                <div className="listTableCell" key="field"><input name="phone" type="text" value={this.state.phone} 
                  pattern="[0-9 ]{8,12}" placeholder="Muodossa 123 123 123" onChange={this.onChange} required /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="listRow" key="button">
          <a className="button center" onClick={this.savePerson}>Tallenna</a>{" "}
          <Link to="/" className="button center">Peruuta</Link>
        </div>
      </div>
    )
  }
}

AddNew.propTypes = {
	saveNew: PropTypes.func,
}

export default AddNew;
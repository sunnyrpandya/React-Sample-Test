import React, { Component } from 'react';
import './User.css';
var styleSheet = {
	form: {
		marginTop: 20,
	},
	formControl: {
		marginBottom: 20,
	},
	inputStyle: {
		marginLeft: 20
	},	
	tdLayout: {
		textAlign: 'center',
		paddingBottom: '1em',
		border: '1px solid #ddd',
		padding: 15
	}
}

class User extends Component { 
  constructor(props) {
	super(props);
	this.state = {			
		firstName: '',
		lastName: '',
		age: 0,
		is_admin: false,
		userData: [],
		searchName: ''
	}
  }
  updateState = (event) => { 				
		let nextState = {};
		nextState[event.target.name] = event.target.value
		this.setState(nextState)
   }
   createUser = () => {
	 console.log("user Data is :" + JSON.stringify(this.state));
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var myInit = { method: 'POST',
				   headers: {					
					'Content-Type': 'application/json',
					'Accept': 'application/json',                  
				},				   				   
				 body: JSON.stringify(this.state)};
		fetch('http://localhost:3000/users', myInit)
		.then(results => {			
			return results.json();
		})
		.then(data => {
			this.getUserData();
		})
  }   
  componentDidMount() {
	this.getUserData();	
  }
  
  getUserData = () => {
	var myHeaders = new Headers();

	var myInit = { method: 'GET',
				   headers: myHeaders				   
				 };
		fetch('http://localhost:3000/users', myInit)
		.then(results => {			
			return results.json()
		})
		.then(data => {
			console.log("data is " + JSON.stringify(data))
			this.setState({
				userData: data
			})
		})
  }
  updateSearchValue = (event) => {
	this.setState({
		searchName: event.target.value
	})
  }
  searchByName = () => {
	var myHeaders = new Headers();

	var myInit = { method: 'GET',
				   headers: myHeaders				   
				 };
		fetch('http://localhost:3000/users/' + this.state.searchName, myInit)
		.then(results => {			
			return results.json()
		})
		.then(data => {
			console.log("data is " + JSON.stringify(data))
			this.setState({
				userData: data
			})
		})
  }
  render() {
    return (
		<div>
		<input type="text" id="searchName" name="searchName" value={this.state.searchName} onChange={this.updateSearchValue}/>
		<button onClick = {this.searchByName}>Search</button>
		<table className="table">
			<tbody>
				<tr>
			<th>SR.NO</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Age</th>			
			</tr>
				{this.state.userData.map(function(listValue, index){
					return <tr key={index}>
					<td style={styleSheet.tdLayout}>{index + 1}</td>
					<td style={styleSheet.tdLayout}>{listValue.firstName}</td>
					<td style={styleSheet.tdLayout}>{listValue.lastName}</td>
					<td style={styleSheet.tdLayout}>{listValue.age}</td>
					</tr>
				})}
			</tbody>
			</table>
			<h2>Add User</h2>
      <form style={styleSheet.form}>
			<div>
				<div style={styleSheet.formControl}>
					<label>First Name</label>
					<input type="text" id="firstName" name="firstName" onChange={this.updateState} style={styleSheet.inputStyle} value = {this.state.firstName}  />
				</div>
				<div style={styleSheet.formControl}>
					<label>Last Name</label>
					<input type="text" id="lastName" name="lastName" onChange={this.updateState} style={styleSheet.inputStyle} value = {this.state.lastName} />
				</div>
				<div style={styleSheet.formControl}>
					<label>Age</label>
					<input type="number" id="age" name="age" onChange={this.updateState} style={styleSheet.inputStyle} value = {this.state.age} />
				</div>				
				<div style={styleSheet.formControl}>
					<input type="button" onClick = {this.createUser} value="submit" />
				</div>
			</div>
		 </form>
		</div>
    );
  }
}

export default User;

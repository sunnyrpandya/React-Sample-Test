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
class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeObj: {
				Name: '',
				Type: '',
			},				
			recipeData: []
		}
	}
	componentDidMount() {
		this.getRecipes();
	}
	getRecipes = () => {
		var myHeaders = new Headers();

	var myInit = { method: 'GET',
				   headers: myHeaders				   
				 };
		fetch('http://localhost:3000/recipes', myInit)
		.then(results => {			
			return results.json()
		})
		.then(data => {			
			this.setState({
				recipeData: data
			})
		})
	}
	updateState = (event) => { 				
		//let nextState = {};
		//nextState[event.target.name] = event.target.value
		//this.setState(nextState)		
		let recipeObj = this.state.recipeObj;
		recipeObj[event.target.name] = event.target.value
		this.setState({
			recipeObj,
		})
   }
   deleteRecipe = (id) => {
		console.log(id)
		var myHeaders = new Headers();	
		var myInit = { 
			method: 'GET',
			headers: myHeaders        
		};
		fetch('http://localhost:3000/recipes/' + id, myInit)
		.then(results => {			
			return results.json();
		})
		.then(data => {			
			this.getRecipes();
		})
   }
   
   createRecipe = () => {
	/*var recipeDataObj = {
		Name: this.state.Name,
		Type: this.state.Type
	}*/
	var recipeDataObj = this.state.recipeObj;
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var myInit = { method: 'POST',
				   headers: {					
					'Content-Type': 'application/json',
					'Accept': 'application/json',                  
				},				   				   
				 body: JSON.stringify(recipeDataObj)};
		fetch('http://localhost:3000/recipes', myInit)
		.then(results => {			
			return results.json();
		})
		.then(data => {
			this.setState({
				recipeObj: {
					Name: '',
					Type: ''
				}
			})
			this.getRecipes();
		})
   }
   renderTable(recipeData) {
	return recipeData.map(function(listValue, index){
					return (<tr key={index}>
					<td style={styleSheet.tdLayout}>{index + 1}</td>
					<td style={styleSheet.tdLayout}>{listValue.Name}</td>
					<td style={styleSheet.tdLayout}>{listValue.Type}</td>					
					<td style={styleSheet.tdLayout}>
						<button onClick = {() => this.deleteRecipe(listValue.id)} >Delete</button>
					</td>
					</tr>)
				}.bind(this))
   }
  render() {
    return (
      <div>
		<table className="table">
			<tbody>
				<tr>
			<th>SR.NO</th>
			<th>Recipe Name</th>
			<th>Reciipe Type</th>
			<th>Action</th>
			</tr>
				{this.renderTable(this.state.recipeData)}
			</tbody>
			</table>
			<h2>Add Recipe</h2>
		<form style={styleSheet.form}>
			<div>
				<div style={styleSheet.formControl}>
					<label>Recipe Name</label>
					<input type="text" id="Name" name="Name" onChange={this.updateState} style={styleSheet.inputStyle} value = {this.state.recipeObj.Name}  />
				</div>
				<div style={styleSheet.formControl}>
					<label>Recipe Type</label>
					<input type="text" id="Type" name="Type" onChange={this.updateState} style={styleSheet.inputStyle} value = {this.state.recipeObj.Type} />
				</div>
				<div style={styleSheet.formControl}>
					<input type="button" onClick = {this.createRecipe} value="Add" />
				</div>
			</div>
		</form>
	  </div>
    );
  }
}

export default Recipe;

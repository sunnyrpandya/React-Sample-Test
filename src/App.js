import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import User from './components/User';
import Recipe from './components/Recipe';
import './App.css'

class App extends Component {  
  render() {
    return (
      <Router>
            <div>
               <h2 style={{textAlign: 'center'}}>React Sample Crud Operation</h2>
               <ul className="ul-layout">
                  <li><Link to={'/'}>User</Link></li>
                  <li><Link to={'/Recipe'}>Recipe</Link></li>
               </ul>
               <hr />
               
               <Switch>
                  <Route exact path='/' component={User} />
                  <Route exact path='/Recipe' component={Recipe} />
               </Switch>
            </div>
         </Router>
    );
  }
}

export default App;

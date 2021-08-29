import React from 'react';
//import ReactDOM from 'react-dom';
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import DashBoard from './pages/Dashboard';
import RegisterPage from './pages/Registerpage';
import TranSaction from './pages/Transaction';
import ProFile from './pages/Profile';
import ChangePass from './pages/Changepass';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/dashboard/:id' component={DashBoard} />
          <Route path='/transaction/:id' component={TranSaction} />
          <Route path='/profile/:id' component={ProFile} />
          <Route path='/changepassword/:id' component={ChangePass} />
          <Route path='/register' component={RegisterPage} />
          
        </Switch>
      </Router>
    </>
  )
}

export default App;

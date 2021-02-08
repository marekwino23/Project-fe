import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";
import './App.css';
import { Main } from './layouts/Main';
import Registration from './Registration';
import Login from './Login';
import Data  from './components/Data';
import Contact  from './components/Contact';
import Forgotpassword  from './components/Forgotpassword';
import Me  from './components/Me';
import PrivateRoute  from './components/PrivateRoute';
import Booked from './components/Booked';
import Rejected from './components/Rejected';
import Validation from './components/Validation'
import Sale from './components/Sale'
import List from './components/List'

function App() {
 
  return (
      <Router basename="/">
        <Main>
          <main>
          <Switch>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot" component={Forgotpassword} />
            <Route exact path="/valid" component={Validation} />
            <PrivateRoute exact path="/me" component={Data} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/contact" component={Contact} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/sale" component={Sale} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/my" component={Me} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/book" component={Booked} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/list" component={List} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/reject" component={Rejected} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
          </Switch>
        </main>
        </Main>
      </Router>
  );
}

export default App;

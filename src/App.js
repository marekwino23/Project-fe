import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";
import './App.css';
import { useHistory } from 'react-router-dom';
import { Main } from './layouts/Main';
import Registration from './Registration';
import Login from './Login';
import Data  from './components/Data';
import Contact  from './components/Contact';
import Me  from './components/Me';
import PrivateRoute  from './components/PrivateRoute';
import Booked from './components/Booked';
import Rejected from './components/Rejected';


function App() {
  const history = useHistory();

  return (
      <Router basename="/">
        <Main>
          <main>
          <Switch>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/me" component={Data} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/contact" component={Contact} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/my" component={Me} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/book" component={Booked} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/reject" component={Rejected} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
          </Switch>
        </main>
        </Main>
      </Router>
  );
}

export default App;

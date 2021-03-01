import React from 'react';
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
import Forgot  from './components/Forgot';
import Me  from './components/Me';
import PrivateRoute  from './components/PrivateRoute';
import Booked from './components/Booked';
import Rejected from './components/Rejected';
import Validation from './components/Validation'
import Sale from './components/Sale'
import List from './components/List'
import EditUser from './components/EditUser'

function App() {
 
  return (
      <Router basename="/">
        <Main>
          <main>
          <Switch>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/valid" component={Validation} />
            <Route exact path="/edit/:id" component={EditUser} />
            <PrivateRoute exact path="/me" component={Data} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/contact" component={Contact} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/sale" component={Sale} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            <PrivateRoute exact path="/my" component={Me} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            {/*<PrivateRoute exact path="/book" component={Booked} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>*/}
            <Route exact path="/book" component={Booked}/>
            <PrivateRoute exact path="/list" component={List} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
            {/*<PrivateRoute exact path="/reject" component={Rejected} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>*/}
            <Route exact path="/reject" component={Rejected}/>

          </Switch>
        </main>
        </Main>
      </Router>
  );
}

export default App;

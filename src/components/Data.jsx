import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import PrivateRoute  from './PrivateRoute';
import Pasedit from './Pasedit';
import Booked from './Booked';
import { Link, useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";


const Data = ({}) => {
const history = useHistory();  
const [data, setData] = useState([]);
const [booking, setBooking] = useState('');
const [hour, setHour] = useState('');
const [as, setAs] = useState('')
const loggedIn = sessionStorage.getItem('loggedIn');
const user = JSON.parse(sessionStorage.getItem('user'));
const[val, setVal] = React.useState(user.email)
const handleChange = (e) => {
    setVal(e.target.value)
    setAs(e.target.value)
}


const onClick = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    try {
      res =  await fetch(`${process.env.REACT_APP_API}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: val, id  })
      });
      if (res.status !== 200) return;
      console.log("hello")
      setVal(val)
      history.push('/my');
    } catch (error) {
      
    }
  }
     


const onGet = async ({}) => {
  let res;
  const { id } = JSON.parse(sessionStorage.getItem('user'));
   res =  await fetch(`${process.env.REACT_APP_API}/info/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json()
    console.log('data: ' , data);
    setBooking(data[0].rezerwacja);
    setHour(data[0].godzina);

}


const onAssemble = async ({}) => {
  let res;
  const { id } = JSON.parse(sessionStorage.getItem('user'));
   res =  await fetch(`${process.env.REACT_APP_API}/assemble/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const info = await res.json()
    console.log('info: ' , info);
    setAs(info[0].email);
}



return(
<div className="data">
<Router basename="/">
          <Switch>
            <PrivateRoute exact path="/pas" component={Pasedit} isAuthenticated={!!sessionStorage.getItem('loggedIn')}/>
          </Switch>
      </Router>
<h1>Dane użytkownika:</h1>
    <table>
        <tr>
<td>Imie: {user.name}  </td>
</tr>
<tr>
<td>Nazwisko: {user.surname}</td>
</tr>
<tr>
<td>Email:  <input value = {as} onChange={handleChange} /> <input type="submit" value="Zapisz" onClick={onClick}/> <input type="submit" value="Pobierz" onClick={onAssemble}/> </td>
</tr>
<tr>
<td> Dzień rezerwacji:{booking} </td>
</tr>
<tr>
<td> Godzina rezerwacji:{hour} </td>
</tr>
<tr>
<td> <button type="button" onClick={onGet}> Pobierz rezerwacje </button> </td>
</tr>
<tr>
<td> {loggedIn ? <button type="button"><Link to="/pas"> Zmień hasło</Link> </button> : null} </td>
</tr>
</table>
</div>

)


}



export default Data;
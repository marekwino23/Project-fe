import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import PrivateRoute  from './PrivateRoute';
import Booked from './Booked';
import { Link, useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";
  import { getURL } from './../helpers';

const Data = ({}) => {
const history = useHistory();  
const [data, setData] = useState([]);
const [booking, setBooking] = useState('');
const [hour, setHour] = useState('');
const [as, setAs] = useState('')
const [read, setRead] = useState('')
const loggedIn = sessionStorage.getItem('loggedIn');
const user = JSON.parse(sessionStorage.getItem('user'));
const[val, setVal] = React.useState(user.email)
const handleChange = (e) => {
    setVal(e.target.value)
    setAs(e.target.value)
}
const inputChange = (e) => {
  setRead(e.target.value)
}


const URL = getURL();

const onClick = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    try {
      res =  await fetch(`http://localhost:4000/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: val, id })
      });
      if (res.status !== 200) return;
      console.log("hello")
      setVal(val)
      history.push('/');
    } catch (error) {
      
    }
  }


  const onPass = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    try {
      res =  await fetch(`http://localhost:4000/improve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password: read, id })
      });
      if (res.status !== 200) return;
      console.log("hello")
      setRead(read)
      history.push('/');
    } catch (error) {
      
    }
  }
     
const onGet = async ({}) => {
  let res;
  const { id } = JSON.parse(sessionStorage.getItem('user'));
   res =  await fetch(`http://localhost:4000/info/${id}`, {
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
   res =  await fetch(`http://localhost:4000/assemble/${id}`, {
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


const onDownload = async ({}) => {
  let res;
  const { id } = JSON.parse(sessionStorage.getItem('user'));
   res =  await fetch(`http://localhost:4000/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const item  = await res.json()
    console.log('item: ' , item);
    setRead(item[0].password);

  }

return(
<div className="data">
<h1>Dane użytkownika:</h1>
    <table>
        <tr>
<td>Imie: {user.name}  </td>
</tr>
<tr>
<td>Nazwisko: {user.surname}</td>
</tr>
<tr>
<td>Email:  <input value = {as} onChange={handleChange} /> <input type="submit" value="Wyświetl email" onClick={onAssemble}/> <input type="submit" value="Zapisz" onClick={onClick}/>  </td>
</tr>
<tr>
<td> Hasło: <input onChange={inputChange} /> <input type="submit" value="Pobierz hasło" onClick={onDownload}/>   <input type="submit" value="Zapisz" onClick={onPass}/>         </td>
</tr>
<tr>
<td> Dzień rezerwacji: {booking} </td>
</tr>
<tr>
<td> Godzina rezerwacji: {hour } </td>
</tr>
<tr>
<td> <button type="button" onClick={onGet}> Pobierz rezerwacje </button> </td>
</tr>
</table>
</div>

)


}



export default Data;
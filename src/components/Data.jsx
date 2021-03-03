
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Data = ({}) => {
const history = useHistory();  
const [booking, setBooking] = useState('');
const [hour, setHour] = useState('');
const [as, setAs] = useState('')
const [read, setRead] = useState('')
const user = JSON.parse(sessionStorage.getItem('user'));
const[val, setVal] = React.useState(user.email)
const handleChange = (e) => {
    setVal(e.target.value)
    setAs(e.target.value)
}
const inputChange = (e) => {
  setRead(e.target.value)
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
      res =  await fetch(`${process.env.REACT_APP_API}/improve`, {
        method: 'PATCH',
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
     
useEffect(() => {
    async function fetchData() {
      const res =  await fetch(`${process.env.REACT_APP_API}/info/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      return await res.json();
    }
    const { id } = JSON.parse(sessionStorage.getItem('user'))
    const data = fetchData();
    console.log('data: ' , data);
    // setBooking(data[0].rezerwacja);
    // setHour(data[0].godzina); 
},[]);

return(
<div className="data">
<h1>Dane użytkownika:</h1>
<div id="create">
      <h2>Edit user</h2>
          <label>Name</label>
          <input type="text" name="name" value={user.name}/>
        <label>Surname </label>
        <input type="text" name="surname" value={user.surname}/>
        <label>Email </label>
        <input type="email" name="email" id="email"  onChange={handleChange} value={as} />
        <input type="submit" value="Change email" onClick={onClick}/>
        <br></br>
        <label>Password</label>
        <input type="password" name="password" onChange={inputChange} value={read} required min="8" />
        <input type="button" value="Change password" onClick={onPass}/>
        </div>
        </div>
)}




export default Data;
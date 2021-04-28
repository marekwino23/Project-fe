
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Data = ({}) => {
  const { email } = JSON.parse(sessionStorage.getItem('user'));
  const { password } = JSON.parse(sessionStorage.getItem('user'));
const history = useHistory();  
const [booking, setBooking] = useState('');
const [hour, setHour] = useState('');
const [service, setService] = useState('');
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
      const { id } = JSON.parse(sessionStorage.getItem('user'))
      fetch(`${process.env.REACT_APP_API}/info/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(response => response.json())
.then(data => {
  if(data.status === "success"){
    data.result.map((item) => {
      setBooking(item.date)
      setHour(item.hour)
      setService(item.service)
    })
  }
 else{
   console.log("lack")
 }
})
    
},[]);

return(
<div className="data">
<h1>Dane użytkownika:</h1>
<div id="create">
      <h2>Edit user</h2>
          <label>Name</label>
          <input type="text" name="name" defaultValue={user.name}/>
        <label>Surname </label>
        <input type="text" name="surname" defaultValue={user.surname}/>
        <label>Email </label>
        <input type="email" name="email" id="email" onChange={handleChange} placeholder={email} value={as} />
        <input type="submit" value="Change email" onClick={onClick}/>
        <br></br>
        <label>Password</label>
        <input type="password" name="password" onChange={inputChange} value={read} required min="8" />
        <input type="button" value="Change password" onClick={onPass}/>
        <br></br>
        <br></br>
       <p>Data rezerwacji</p> <input type="text" readOnly value={booking}/>
        <br></br>
        <p>Godzina rezerwacji</p> <input type="text" readOnly  value={hour}/>
        <br></br>
        <p>Wybrana usluga</p> <input type="text" readOnly  value={service}/>
        </div>
        </div>
)}




export default Data;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Rejected = ({}) => {
const history = useHistory();
const [data, setData] = useState([]);
const [booking, setBooking] = useState('');
const [hour, setHour] = useState('');
const loggedIn = sessionStorage.getItem('loggedIn');
const user = JSON.parse(sessionStorage.getItem('user'))




const onDel = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    history.push('/me');
     res =  await fetch(`${process.env.REACT_APP_API}/del`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ booking, id, hour }),
      });
}


const onErase = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    history.push('/me');
     res =  await fetch(`${process.env.REACT_APP_API}/erase`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ booking, id, hour }),
      });
}




const onClick = async ({}) => {
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

return(
<div> <button type="button" onClick={onClick}> Wyświetl rezerwacje </button> 
<button type="button" onClick={onDel}> Usuń rezerwacje </button> 
<button type="button" onClick={onErase}> Usuń godzine </button> 
<h1> Data rezerwacji: {booking}</h1>
<h1> Godzina rezerwacji: {hour}</h1> 
</div>
)}










export default Rejected
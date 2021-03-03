import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TimePicker from 'react-time-picker';

const Rejected = () => {
    const history = useHistory();
    const [time, setTime] = useState('')
    const [booking, setBooking] = useState('');
    const [hour, setHour] = useState('');


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
        body: JSON.stringify({ id }),
      });
}


const changeHour = async () => {
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
    history.push('/me');
     res =  await fetch(`${process.env.REACT_APP_API}/changed`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ booking, id, time }),
      });
}

useEffect(()=>{
  const { id } = JSON.parse(sessionStorage.getItem('user'));
  fetch(`${process.env.REACT_APP_API}/info/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
    console.log('data: ' , data);
    setBooking(data[0].rezerwacja);
    setHour(data[0].godzina);
    })
},[])

    return (
        <div className="container">
            <p className="h2"> Data rezerwacji: {booking} </p>
            <p className="h2"> Godzina rezerwacji: {hour} </p>
            <button type="button" onClick={onErase} className="form-control"> Usuń rezerwacje</button>
            <button type="button"  onClick={changeHour} className="form-control"> Zmień godzine</button>
            <div className="container">
            <TimePicker onChange={setTime} value={time} minTime="10:00:00" maxTime="18:00:00"/>
            </div>
        </div>
    )
}


export default Rejected
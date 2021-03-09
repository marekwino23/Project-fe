import cogoToast from 'cogo-toast';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TimePicker from 'react-time-picker';

const Rejected = () => {
    const history = useHistory();
    const [time, setTime] = useState('')
    const [booking, setBooking] = useState('');
    const [hour, setHour] = useState('');


const onErase = async () => {
  if(booking === '' || hour === ''){
    cogoToast.error("Delete failed because lack of date and time")
  }
  else{
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
     res =  await fetch(`${process.env.REACT_APP_API}/erase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      })
      .then(response => response.json())
      .then(data => {
      if(data.status === "success"){
        alert("Delete success")
      }
  })
 }
}


const changeHour = async () => {
  if(time === ''|| hour !== '' ){
    cogoToast.info("lack of changes")
  }
  else if(hour === ''){
    cogoToast.info("if you want change hour the at first you must make book")
  }
  else{
    let res;
    const { id } = JSON.parse(sessionStorage.getItem('user'));
     res =  await fetch(`${process.env.REACT_APP_API}/changed`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ booking, id, time }),
      });
      cogoToast.success("Changes success")
      history.push('/me');
  }   
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
    if(data.status === "lack"){
      cogoToast.info("lack of date and time")
    }
    else if(data.status === "success"){
      setBooking(data.date);
      setHour(data.time);
    }
    })
},[])

    return (
        <div className="container">
            <p className="h2"> Date booking: {booking} </p>
            <p className="h2"> Hour booking: {hour} </p>
            <button type="button" onClick={onErase} className="form-control"> Delete booking</button>
            <button type="button"  onClick={changeHour} className="form-control"> Check hours</button>
            <div className="container">
            <TimePicker onChange={setTime} value={time} minTime="10:00:00" maxTime="18:00:00"/>
            </div>
        </div>
    )
}


export default Rejected
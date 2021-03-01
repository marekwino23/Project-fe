import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TimePicker from 'react-time-picker';

const Rejected = () => {
    const history = useHistory();
    const [time, setTime] = useState('')
    const [booking, setBooking] = useState('');
    const [hour, setHour] = useState('');


// const onErase = async () => {
//     let res;
//     const { id } = JSON.parse(sessionStorage.getItem('user'));
//     history.push('/me');
//      res =  await fetch(`http://localhost:4000/erase`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ id }),
//       });
// }
//
//
// const changeHour = async () => {
//     let res;
//     const { id } = JSON.parse(sessionStorage.getItem('user'));
//     history.push('/me');
//      res =  await fetch(`http://localhost:4000/changed`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ booking, id, time }),
//       });
// }
//
// useEffect(()=>{
//   const { id } = JSON.parse(sessionStorage.getItem('user'));
//   fetch(`http://localhost:4000/info/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//     .then(response => response.json())
//     .then(data => {
//     console.log('data: ' , data);
//     setBooking(data[0].rezerwacja);
//     setHour(data[0].godzina);
//     })
// },[])

    return (
        <div className="container">
            <p className="h2"> Data rezerwacji: {booking} </p>
            <p className="h2"> Godzina rezerwacji: {hour} </p>
            <button type="button" className="form-control"> Usuń rezerwacje</button>
            <button type="button" className="form-control"> Zmień godzine</button>
            <div className="container">
            <TimePicker onChange={setTime} value={time} minTime="10:00:00" maxTime="18:00:00"/>
            </div>
        </div>
    )
}


export default Rejected
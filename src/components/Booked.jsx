import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';

const Booked = () => {
    const history = useHistory();
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const onChange = () => {
        alert((date));
    };

    console.log("date: ", date);


    const onClick = async ({}) => {
        let res;
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        cogoToast.success('Dziękuje za rezerwacje', {
            timeout: 1000
          });
        history.push('/me');
         res =  await fetch(`${process.env.REACT_APP_API}/rez`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({id, time, date})
          });
    }



return(
      <div> 
          <Calendar
          onChange={setDate}
          value={date}
 />

<TimePicker
onChange={setTime}
value={time}
/>
 <button onClick={onClick}>Wybierz</button>

     </div>
)
}




export default Booked
import React, { useMemo, useState } from 'react';
import TimePicker from 'react-time-picker';
import cogoToast from 'cogo-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';

const Booked = () => {
    const history = useHistory();
    const [date, setDate] = useState('');
    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [items, setItems] = useState('');

    console.log('time: ', time);

    const onClick = async ({}) => {
        let res;
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        const data = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        history.push('/me');
         res =  await fetch(`${process.env.REACT_APP_API}/rez`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({id, time, data})
          });
          const information = await res.json()
          console.log(information.info)
          if(information.info === "incorrect hour because you can t choose past time"){
            alert(information.info)
              }

          else {
          cogoToast.success('Dziękuje za rezerwacje', {
          timeout: 1000
    });
  }
  }

    const onBusy = async () => {
      let res;
       res =  await fetch(`${process.env.REACT_APP_API}/busy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({time})
        });
        const data = await res.json();
        alert(data.status)
        setItems(data);
      }

        const today = useMemo(() => new Date(), []);
        const currentDate = useMemo(() => new Date(date), [date]);

        const handleChange = (e) =>{
        setData(e.target.value)
        console.log(e.target.value)
        }
    
    const onChangeTime = (val) => {
      if (!val.length) return;
      console.log('do somehing');
      const [hour, minutes] = val.split(':');
      if(currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth()) {
        console.log('val: ',today.getHours(), today.getMinutes(), hour, minutes);
        if(+hour > 9 && +hour < 19 && +hour > today.getHours() && +minutes > today.getMinutes()) {
          setTime(val);
        } else {
          setTime('')
        }
      } else if(+hour < 9 && +hour > 18) {
        setTime('');
      } else {
        setTime(val);
      }
    }

return (
    <div>
        <div className="container">
            <p className="h1"> Wybierz termin </p>
        <DatePicker
        minDate={today}
        required
        onChange={setDate}
        selected={date}
      />
        </div>
        <div className="container">
      <TimePicker
        onChange={onChangeTime}
        disabled={date ? false : true}
        minTime="10:00:00"
        maxTime="18:00:00"
        required
        value={time}
      />
        </div>
<div className="container">
      <select className="form-control" value={data} onChange={handleChange}>
        <option></option>
        <option>Obcinanie włosów-30zł</option>
        <option>Farbowanie włosów-40zł</option>
        <option>Umycie włosów-20zł</option>
      </select>
    </div>
      <button className="form-check" onClick={onClick}>Wybierz</button>
      <button className="form-check"  onClick={onBusy}>Sprawdz czy dana godzina jest wolna</button>
      <br></br>
      <p>{items.status}</p>
    </div>
  )
}

export default Booked

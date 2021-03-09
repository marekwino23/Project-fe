import React, { useMemo, useState } from 'react';
import TimePicker from 'react-time-picker';
import cogoToast from 'cogo-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import { getDate, getHours } from 'date-fns';

const Booked = () => {
    const history = useHistory();
    const [date, setDate] = useState('');
    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [items, setItems] = useState('');
    const [service, setService] = useState('');

    console.log('time: ', time);

    const onClick = async ({}) => {
        let res;
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        const data = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        console.log(date,time,service)
        if(date === '' || time === '' || service === ''){
          cogoToast.success('Prosze wypełnić wszystkie pola', {
      });
        }
        else if(date !== '' && time !== '' && service !== '' ){
            history.push('/me');
             res =  await fetch(`${process.env.REACT_APP_API}/rez`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({id, time, data, service})
              });
              const information = await res.json()
              console.log(information.info)
              if(information.info === "incorrect hour because you can t choose past time"){
                cogoToast.success(information.info)
                  }
              else {
              cogoToast.success('Dziękuje za rezerwacje', {
              timeout: 5000
        });
      }        
   }
 }

    const onBusy = async () => {
      const { id } = JSON.parse(sessionStorage.getItem('user'));
      console.log(date,time)
      let res;
       res =  await fetch(`${process.env.REACT_APP_API}/busy/${time}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
       })
        const data = await res.json();
        setItems(data);
        if(data.status == "failed"){
         cogoToast.warn("this time is busy")
        }
        else{
          cogoToast.info(" this time free")
        }
      
      }
        const today = useMemo(() => new Date(), []);
        const currentDate = useMemo(() => new Date(date), [date]);

        const handleChange = (e) =>{
        setService(e.target.value)
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
      <select className="form-control" value={service} onChange={handleChange}>
        <option></option>
        <option>Obcinanie włosów-30zł</option>
        <option>Farbowanie włosów-40zł</option>
        <option>Umycie włosów-20zł</option>
      </select>
    </div>
    <button className="form-check" onClick={onClick}>Wybierz</button>
    <p>{data}</p>
      <button className="form-check" onClick={onBusy}>Sprawdz wybrany termin</button>
      <br></br>
    </div>
  )
}

export default Booked

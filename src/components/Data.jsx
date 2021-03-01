
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
      res =  await fetch(`${process.env.REACT_APP_API}/improve`, {
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
    setBooking(data[0].rezerwacja);
    setHour(data[0].godzina); 
},[]);


const onAssemble = async ({}) => {
  let res;
  const { id } = JSON.parse(sessionStorage.getItem('user'));
   res =  await fetch(`${process.env.REACT_APP_API}/assemble/${id}`, {
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
   res =  await fetch(`${process.env.REACT_APP_API}/${id}`, {
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
{/* <td> <button type="button" onClick={onGet}> Pobierz rezerwacje </button> </td> */}
</tr>
</table>
</div>

)


}



export default Data;
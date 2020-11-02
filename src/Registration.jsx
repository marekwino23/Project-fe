import React, { useState, useEffect } from 'react';
import obrazek from "./logo.svg";
import { useHistory, useLocation } from 'react-router-dom';
import cogoToast from 'cogo-toast';

const Registration = () => {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const onChange = ({ target }) => {
    target.name === "name" && setName(target.value);
    target.name === "surname" && setSurname(target.value);
    target.name === "email" && setEmail(target.value);
    target.name === "password" && setPassword(target.value);
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      setLoading(true);
      cogoToast.loading("Loading")
    res = await fetch(`${process.env.REACT_APP_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,surname, email, password })
    });
    setLoading(false);
    console.log('res: ', res);
    if(res.status > 300 ) return;
    const data = await res.json();
    data.status === 'success' && cogoToast.success('user was successfully creaed. You can now log in', {
      timeout: 5000
    });
    history.push('/login');
    } catch(error) {
      setError(error.message);
    }
  }

 !loading && error && cogoToast.error(`registration error: ${error}`, {
   timeout: 500
 });

    return (
      <div className="App">
        <header className="App-header">
        <img src={obrazek} alt="react"/>
          <form onSubmit={onSubmit}>
              <label>Podaj Imie</label>
           <input className="name" name="name" value={name} onChange={onChange} type="text"/>
           <br></br>
           <label> Podaj Nazwisko</label>
           <input className="surname" name="surname" value={surname} onChange={onChange} type="text"/>
           <br></br>
           <label>Podaj emaila</label>
           <input className="email" name="email" value={email} onChange={onChange} type="email"/>
           <br></br>
           <label>Podaj hasło</label>
           <input className="password" name="password" value={password} onChange={onChange} type="password"/>
           <br></br>
           <input className="send" type="submit" value="Send"/>
          </form>
        </header>
      </div>
    );
  }
  
  export default Registration;
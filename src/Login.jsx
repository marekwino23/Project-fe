import React, { useEffect, useReducer, useState } from 'react';
import cogoToast from 'cogo-toast';
import {Link, useHistory } from 'react-router-dom';

const initial = { loading: false, error: '' };

const appReducer = (state = initial, action) => {
  switch(action.type) {
    case 'LOADING': return {...state, loading: action.payload}
    case 'ERROR': return {...state, error: action.payload}
    default: return state;
  }
}


const validateFields = (fields) => {
  const error = {};
  Object.keys(fields).forEach(k => {
    if(fields[k] === '') error[k] = 'is required'
  });
  return error;
}


const Login = () => {
  const [state, dispatch] = useReducer(appReducer,initial);
  const [error, setError] = useState({ email: '', password: ''});
const [email, setEmail] = useState('');
const [type, setType] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState({});

const history = useHistory();

const onChange = ({ target }) => {
  if(!target.value) setError(prev => ({...prev, [target.name]: 'field is required' }));
  target.name === "email" ? setEmail(target.value) : setPassword(target.value);
}

  const onSubmit = async (e,type) => {
    e.preventDefault();

    const v = validateFields({ email, password });
    if(v.email || v.password) {
      setError(v);
      return;
    } 

    dispatch({ type: 'LOADING', payload: true });
      state.loading && cogoToast.loading("loading");

    try {
     const res = await fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    dispatch({ type: 'LOADING', payload: false });
    if(res?.status > 300 ) return;
    const data = await res.json();
    setUser(data.user);
    sessionStorage.setItem('type', data.type)
    console.log(type)
    } catch(error) {
      dispatch({ type: 'ERROR', payload: true });
    }
  }

  useEffect(() => {
    if(user.name) {
      cogoToast.success("Success login")
      sessionStorage.setItem('loggedIn', true);
      sessionStorage.setItem('user', JSON.stringify(user));
      window.location.href = "/"
    }
  }, [user])




    return (
      <div className="App">
        <h1>Rejestracja</h1>
        <header className="App-header">
        <div class="container">
        <form onSubmit = {onSubmit}>
    <div className="row">
      <div className="col-25">
        <label htmlfor="fname">Podaj emaila</label>
      </div>
      <div className="col-75">
      <input id="email" className="log" name="email" type="text" onChange={onChange}/>
              {error.email && <span style={{color: "red", marginTop: '5px'}}>Email jest wymagany</span>}
      </div>
    </div>
    <div className="row">
      <div className="col-25">
        <label htmlfor="lname">Podaj hasło</label>
      </div>
      <div className="col-75">
      <input id="pas" className="pas" type="password" name="password" onChange={onChange} />
            {error.password && <span style={{color: "red", marginTop: '5px'}}>Hasło jest wymagane</span>}
            <Link to="/forgot"> <button type="button"> Zapomniałem hasła </button> </Link> 
      </div>
    </div>
    <input className="send"type="submit" value="Log in"/>
  </form>
</div>
        {/* <img src={obrazek} alt="react"/>
          <form onSubmit = {onSubmit}>
            <div>
              <label htmlFor="email">Podaj email: </label>
              <input id="email" className="log" name="email" type="text" onChange={onChange}/>
              {error.email && <span style={{color: "red", marginTop: '5px'}}>Email jest wymagany</span>}
            </div>
           <div>
            <label htmlFor="pas">Podaj hasło: </label>
            <input id="pas" className="pas" type="password" name="password" onChange={onChange} />
            {error.password && <span style={{color: "red", marginTop: '5px'}}>Hasło jest wymagane</span>}
            <Link to="/forgot"> <button type="button"> Zapomniałem hasła </button> </Link> 
          </div>
          <input className="send"type="submit" value="Log in"/>
          </form> */}
        </header>
      </div>
    );
  }
  
  export default Login;
import React, { useEffect, useReducer, useState } from 'react';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';
import obrazek from "./logo.svg";


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
  const [state, dispatch] = useReducer(appReducer);
  const [error, setError] = useState({ email: '', password: ''});

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState({});

const history = useHistory();

const onChange = ({ target }) => {
  if(!target.value) setError(prev => ({...prev, [target.name]: 'field is required' }));
  target.name === "email" ? setEmail(target.value) : setPassword(target.value);
}

  const onSubmit = async (e) => {
    e.preventDefault();

    const v = validateFields({ email, password });
    if(v.email || v.password) {
      setError(v);
      return;
    } 

    let res;
    try {
      dispatch({ type: 'LOADING', payload: true });
      state.loading && cogoToast.loading("loading");
    res = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    dispatch({ type: 'LOADING', payload: false });
    if(res.status > 300 ) return;
    const data = await res.json();
    setUser(data.user);
    debugger;
    history.push("/");
    } catch(error) {
      dispatch({ type: 'ERROR', payload: true });
    }
  }

  useEffect(() => {
    if(user.name) {
      cogoToast.success("Success login")
      sessionStorage.setItem('loggedIn', true);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])




    return (
      <div className="App">
        <header className="App-header">
        <img src={obrazek} alt="react"/>
          <form onSubmit = {onSubmit}>
            <div>
              <label htmlFor="email">Podaj email: </label>
              <input id="email" className="log" name="email" type="text" onChange={onChange}/>
              {error.email && <span style={{color: "red", marginTop: '5px'}}>Email jest wymagany</span>}
            </div>
           <div>
            <label hmlFor="pas">Podaj hasło: </label>
            <input id="pas" className="pas" name="password" type="text" onChange={onChange} />
            {error.password && <span style={{color: "red", marginTop: '5px'}}>Hasło jest wymagane</span>}
          </div>
          <input className="send"type="submit" value="Send"/>
          </form>
        </header>
      </div>
    );
  }
  
  export default Login;
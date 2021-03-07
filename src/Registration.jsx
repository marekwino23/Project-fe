import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

const Registration = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailAvailable, setEmailAvailable] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState({});


  const onChange = ({ target }) => {
    target.name === "name" && setName(target.value);
    target.name === "surname" && setSurname(target.value);
    if(target.name === "email") {
      emailAvailable.hasEmail && setEmailAvailable({});
      setEmail(target.value);
    }
    target.name === "password" && setPassword(target.value);
  }


  const isFormvValid=() =>{
    let isValid = true;
    let invalidFields = {};
    ['name','surname','email', 'password'].forEach(field => {
     if([field] === '') {
       invalidFields[field] = 'field can not be empty';
       isValid = false;
     }
    });
    setInvalidFields(invalidFields);
    return isValid;
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    let res;
    if(!isFormvValid) return;
    try {
      setLoading(true);
      cogoToast.loading("Loading")
    res = await fetch(`${process.env.REACT_APP_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, email, password })
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

 const checkEmailAvailable = async () => {
  if(!email) return;
  const res = await fetch(`${process.env.REACT_APP_API}/checkEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  setEmailAvailable(data);
}


    return (
      <div className="App">
        <header className="App-header">
        <div className="container">
            <p className="h1">Rejestracja </p>
        <form onSubmit={onSubmit}>
    <div className="row">
      <div className="mb-3">
        <label htmlFor="fname" className="form-label"> Podaj imie</label>
      </div>
      <div className="mb-3">
        <input type="text" id="fname" className="form-text" name="name" value={name} onChange={onChange} placeholder="Your name.."/>
      </div>
    </div>
    <div className="row">
      <div className="mb-3">
        <label htmlFor="lname" className="form-label">Podaj nazwisko</label>
      </div>
      <div className="mb-3">
        <input type="text" id="lname" className="form-text" name="surname" onChange={onChange} value={surname} placeholder="Your last name.."/>
      </div>
    </div>
    <div className="row">
      <div className="mb-3">
        <label htmlFor="email" className="form-label" >Podaj email</label>
      </div>
      <div className="mb-3">
      <input name="email" className="form-text" value={email} onChange={onChange} id="email" type="email" required/>
                {invalidFields.email && <p className="error">{invalidFields.email}</p>}
                {emailAvailable.status && <p>{emailAvailable.status}</p>}
                <input type="button" className="send" value="check Email" onClick={checkEmailAvailable} disabled={!email} />
                <br></br>
      </div>
    </div>
    <div className="row">
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Podaj hasło</label>
      </div>
      <div className="mb-3">
      <input className="form-control" name="password" value={password} onChange={onChange} id="password" type="password" required/>
                {invalidFields.password && <p className="error">{invalidFields.password}</p>}
      </div>
    </div>
    <br></br>
    <br></br>
    <div className="row">
    <input className="btn btn-primary" type="submit" disabled={Object.keys(invalidFields).length,!checkEmailAvailable} value="Register"/>
    </div>
  </form>
</div>
        </header>
      </div>
    );
  }
  
  export default Registration;
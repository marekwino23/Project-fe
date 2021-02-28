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
    res = await fetch(`http://localhost:4000/register`, {
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
  const res = await fetch('http://localhost:4000/checkEmail', {
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
        <h1>Rejestracja</h1>
        <header className="App-header">
        <div class="container">
        <form onSubmit={onSubmit}>
    <div class="row">
      <div class="col-25">
        <label for="fname">Podaj imie</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="name" value={name} onChange={onChange} placeholder="Your name.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Podaj nazwisko</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="surname" onChange={onChange} value={surname} placeholder="Your last name.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="email">Podaj emaila</label>
      </div>
      <div class="col-75">
      <input className="email" name="email" value={email} onChange={onChange} type="email" required/>
                {invalidFields.email && <p className="error">{invalidFields.email}</p>}
                {emailAvailable.status && <p>{emailAvailable.status}</p>}
                <input type="button" className="send" value="check Email" onClick={checkEmailAvailable} disabled={!email} />
                <br></br>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="password">Podaj hasło</label>
      </div>
      <div class="col-75">
      <input className="password" name="password" value={password} onChange={onChange} type="password" required/>
                {invalidFields.password && <p className="error">{invalidFields.password}</p>}
      </div>
    </div>
    <br></br>
    <br></br>
    <div class="row">
    <input className="send" type="submit" disabled={Object.keys(invalidFields).length} value="Register"/>
    </div>
  </form>
</div>
        </header>
      </div>
    );
  }
  
  export default Registration;
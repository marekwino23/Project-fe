import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

 const Validation = () => {
 const [code, setCode] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');


 const history = useHistory();

  const onValid = async () => {
  let res;
  res = await fetch(`http://localhost:4000/valid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email, password })
    });
    const data = await res.json()
    console.log(data)
    if(data.status === "success"){
      alert("change success")
        history.push('/login')
    }
    else{
        console.log("failed")
        alert("wrong code")
    }
  }

    const onChange = ({ target }) => {
      if(target.name === "code") {
        setCode(target.value);
      }
      else if(target.name === "email"){
          setEmail(target.value)
      }
      else if(target.name === "password"){
        setPassword(target.value)
    }
    }

    return (
    <div>
       <form onSubmit={onValid} method="post" action="http://localhost:4000/valid">
       <label>Podaj email: </label>
       <input id="email" name="email" type="text" onChange={onChange}/>
       <label>Podaj kod do zmiany hasła: </label>
          <input id="code" name="code" type="text" onChange={onChange}/>
          <label>Wpisz nowe hasło: </label>
          <input type="password" name="password" onChange={onChange}/>
          <input className="send" type="submit" value="Change password"/>
          </form>
    </div>
      )
    }
    export default Validation;
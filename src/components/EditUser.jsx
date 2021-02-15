import React, { useState,useEffect } from 'react';

const EditUser = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log("hello")
  const[user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/getuserData`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
              console.log(user)
              setUser(data)
          }) 
        
    },[]);


    const onChange = ({ target }) => {
      console.log("hello")
      target.name === "name" && setName(target.value);
      target.name === "surname" && setSurname(target.value);
      if(target.name === "email") {
        setEmail(target.value);
      }
      target.name === "password" && setPassword(target.value);
    }


    const onClick = () => {
      console.log(this.history.params)
      fetch(`http://localhost:4000/editUser`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,surname,email,password}),
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === "success"){
          alert("update success")
        }
        else{
          alert("failed")
        }
      }) 
    }

return(
  <div>
<div key={user.id}>
<header className="App-header">
          <form onSubmit={onClick}>
              <div className="field">
                <label htmlFor="">Podaj Imie</label>
                  <input className="name" name="name" onchange={onChange} value={user.name} type="text" required/>
              </div>
              <div className="field">
                <label htmlFor=""> Podaj Nazwisko</label>
                <input className="surname" name="surname" onchange={onChange} value={user.surname} type="text" required/>
              
              </div>
              <div className="field">
                <label htmlFor="">Podaj emaila</label>
                <input className="email" name="email" onchange={onChange} value={user.email} type="email" required/>
              </div>
              <div className="field">
                <label>Podaj hasło</label>
                <input className="password" name="password" onchange={onChange} value={user.password}  type="password" required/>
                <input className="send" type="submit" value="Update"/>
              </div>
          </form>          
        </header>
        </div>
        </div>
  )
}


export default EditUser;
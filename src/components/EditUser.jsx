import React, { useState,useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom"

const EditUser = () => {
  const history = useHistory()
  const { id } = useParams();
  console.log(id)
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[user, setUser] = useState({})
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/getuserData`, {
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
      console.log(id)
      fetch(`${process.env.REACT_APP_API}/editUser`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,name,surname,email,password}),
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === "success"){
          alert("update success")
          history.push({pathname: "/list"})
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
                <label>Podaj Imie</label>
                  <input className="name" name="name" onChange={onChange} value={name} type="text" required/>
              </div>
              <div className="field">
                <label> Podaj Nazwisko</label>
                <input className="surname" name="surname" onChange={onChange} value={user.surname} type="text" required/>
              </div>
              <div className="field">
                <label>Podaj emaila</label>
                <input className="email" name="email" onChange={onChange} value={user.email} type="email" required/>
              </div>
              <div className="field">
                <label>Podaj hasło</label>
                <input className="email" name="email" onChange={onChange} value={user.email} type="email" required/>
                <input className="password" name="password" onChange={onChange} value={user.password} type="password" required/>
                <input className="send" type="submit" value="Update"/>
              </div>
          </form>          
        </header>
        </div>
        </div>
  )
}


export default EditUser;
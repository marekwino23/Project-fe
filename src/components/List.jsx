import React, { useState,useEffect } from 'react';
import {useHistory } from 'react-router-dom';

const List = () =>{
  const history = useHistory()
  const[users, setUsers] = useState([]);
    useEffect(() => {
        const res = fetch(`${process.env.REACT_APP_API}/list`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log(users)
              setUsers(data)
          }); 
        
    },[ ]);

    const onEdit = (id) => {
      console.log(id)
      history.push({pathname:`/edit/${id}`
    })
    }

    const deleteUser = (id) => {
      console.log('user id: ', id);
      fetch(`${process.env.REACT_APP_API}/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id }),
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === "success"){
          alert("delete success")
        }
        else{
          alert("failed")
        }
      }) 
    }

return(
<div>
  <h1>Lista użytkowników</h1>
<table id="customers">
<thead>
  <tr>
      <th>id</th>
      <th>name</th>
      <th>surname</th>
      <th>email</th>
      <th>date</th>
      <th>hour</th>
      <th>service</th>
      <th>action</th>
    </tr>
</thead>
<tbody>
  {users.map(user => (
    <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.surname}</td>
    <td>{user.email}</td>
    <td>{user.date}</td>
    <td>{user.hour}</td>
    <td>{user.service}</td>
    <button onClick={() => deleteUser(user.id)}>Delete user</button>
    <button  onClick={() => onEdit(user.id)} >Edit user</button>
  </tr>
  ))}
</tbody>
  </table>
</div>
)}







export default List;
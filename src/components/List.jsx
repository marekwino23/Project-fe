import { cleanup } from '@testing-library/react';
import React, { useState,useEffect } from 'react';

const List = () =>{
  const[users, setUsers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/list`, {
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
          }) 
        
    },[]);

    const deleteUser = () =>{

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
      <th>rezerwacja</th>
      <th>godzina</th>
      <th>type</th>
    </tr>
</thead>
<tbody>
  {users.map(user => (
    <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.surname}</td>
    <td>{user.email}</td>
    <td>{user.rezerwacja}</td>
    <td>{user.godzina}</td>
    <td>{user.type}</td>
  </tr>
  ))}
</tbody>
<input type="button" onClick={() => deleteUser} value="delete user"></input>
<input type="button" value="edit user"></input>
  </table>
</div>
)}







export default List;
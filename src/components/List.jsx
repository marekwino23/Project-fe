import React, { useState,useEffect } from 'react';

const List = () =>{
    useEffect(() => {
        let res;
         fetch(`http://localhost:4000/list`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

    },[]);

return(
<div>
<h1>Lista użytkowników</h1>
</div>

)}










export default List;
import React from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const { name } = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : { name: ''};
    const onClick = async () => {
        try {
          await fetch(`${process.env.REACT_APP_API}/logout`);
          sessionStorage.clear();
          window.location.href='/login';
    
        } catch(error) {
    
        }
      }
    return (
    <header className="App-header">
          {loggedIn ? <Link to="/book"> <button type="button" >Book</button> </Link> :null }
          {loggedIn ?  <Link to="/reject"><button type="button"  > Reject </button>  </Link> :null  }
    {loggedIn ?  <Link to="/my"> <button type="button" > Me </button></Link> : null}
    {loggedIn ?  <Link to="/contact"> <button type="button" > Contact </button> </Link> : null}
    {loggedIn ?  <Link to="/sale"> <button type="button" > Sale </button> </Link> : null}
    {loggedIn ?  <div className="account">{`Hello ${name}`}</div> : null}
    {loggedIn ?  <button type="button"><Link style={{color:"white"}} to="/me"> User account</Link> </button> : null}
    {loggedIn  ?   <button type="button"><Link style={{color:"white"}} to="/list"> List users</Link> </button> : null}
    {loggedIn ?   <button style={{height:"100%"}} type="button" onClick={onClick} > Logout </button> : null}
    {loggedIn ? null : <Link to="/register"> <button style={{marginTop:"48px"}}> Register </button> </Link>}
    {loggedIn ? null : <Link to="/login"> <button style={{marginTop:"48px"}}> Login </button> </Link>}
    </header>
    );
}
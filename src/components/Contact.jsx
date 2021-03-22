import React from 'react';
import obrazek from '../iphone-160307_960_720.webp';

const Contact = () => {
return(
<div>
    <h1>Dane kontaktowe:</h1>
    <img src={obrazek} style={{marginBottom:"40px"}} width="50%" alt="obrazek"></img>
<p style={{color:"white"}}>Email: barber-app@gmail.com</p>
<p>Nr telefonu: 505530072</p>
<p>Web: www.barber-app.com</p>
</div>
)
}




export default Contact;
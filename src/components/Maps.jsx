import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '600px',
    height: '400px',
  };

export function Maps(props) {
    return (
        <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}} 
        />
    )
  }


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCyYxYuS2IvAw_-C1Drzl-VQ3QyoO5lX5I'
  })(Maps);


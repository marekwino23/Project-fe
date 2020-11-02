import React from 'react';
import { Header } from './Header';

export const Main = ({ children}) => (
    <div className="App">
        <Header />
        {children}
    </div>

)
import React from 'react';
import './navbar.css';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
function Navbar  ({text})  {
  
    return ( <div className="container2">
        
        <div className="text"><h1>{text}</h1></div>
        {/* <input type="text" className='search'/> */}
        
        <button className="navbt"></button>
    </div> );
}
 
export default Navbar;
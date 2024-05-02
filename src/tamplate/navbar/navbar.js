import React from 'react';
import './navbar.css';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
function Navbar  ({text,search,setSearch})  {
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update the state based on the input name
        
            setSearch(value);
        
    };
    return ( <div className="container2">
        
        <div className="text"><h1>{text}</h1></div>
        <input class="search" type="text" placeholder="Search" onChange={handleInputChange}  />
        
        <button className="navbt"></button>
    </div> );
}
 
export default Navbar;
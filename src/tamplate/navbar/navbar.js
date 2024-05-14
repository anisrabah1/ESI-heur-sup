import React, { useEffect, useState } from 'react';
import './navbar.css';
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';
function Navbar  ({search,setSearch})  {
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update the state based on the input name
        
            setSearch(value);
        
    };
    const location = useLocation();
    const currentPath = location.pathname;
    const [text , set_text]=useState();

    useEffect(
        ()=>{
            if (currentPath === '/') {
                set_text('welcome')
            }else{
                set_text('Teachers')
            }
        }
    )
    return ( <div className="container2">
        
        <div className="text"><h1>{text}</h1></div>
        {text==='Teachers' && 
        <input class="search" type="text" placeholder="Search" onChange={handleInputChange}  />}
        
        <button className="navbt"></button>
    </div> );
}
 
export default Navbar;
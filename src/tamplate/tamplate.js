
import Sidebar from "./sideBar/sideBar";
import Navbar from "./navbar/navbar";
import { useState } from 'react';

const Tamplate = ({search,setSearch}) => {
    

    return (  
        <div>
        <Navbar  search={search} setSearch={setSearch}/>
        <Sidebar  />
         
        </div>
     );
}
 
export default Tamplate;
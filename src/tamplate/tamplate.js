import Sidebar from "./sideBar/sideBar";
import Navbar from "./navbar/navbar";
import { useState } from 'react';

const Tamplate = ({search,setSearch}) => {
    const [text , set_text] = useState('welcome')

    return (  
        <div>
        <Navbar text={text} search={search} setSearch={setSearch}/>
        <Sidebar press={set_text}  />
         
        </div>
     );
}
 
export default Tamplate;
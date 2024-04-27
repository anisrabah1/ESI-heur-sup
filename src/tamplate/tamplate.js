
import Sidebar from "./sideBar/sideBar";
import Navbar from "./navbar/navbar";
import { useState } from 'react';
import Content from '../content';
const Tamplate = () => {
    const [text , set_text] = useState('welcome')

    return ( 
        <div>
        <Navbar text={text} />
        <Sidebar press={set_text} />
        <Content/>  
        </div>
     );
}
 
export default Tamplate;
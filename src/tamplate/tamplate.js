import Sidebar from "./sideBar";
import Navbar from "./navbar";
import Content from '../content';

const tamplate = () => {
    return ( 
        <div>
        <Navbar/>
        <Sidebar/>
        <Content/>
        </div>
     );
}
 
export default tamplate;
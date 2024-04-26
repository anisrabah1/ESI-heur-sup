import { Route , Routes } from 'react-router-dom';
import Home from './Home';
import Teachers from './Teachers';
const content = () => {

    
    return ( <div className="content">
        
        <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/teachers' element={<Teachers/>}/>
      
    </Routes>
    
    </div> );
}
 
export default content;
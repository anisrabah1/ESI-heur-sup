import Tamplate from './tamplate/tamplate';


import './App.css';

import Log_in from './loginPage/Log-in'

import { BrowserRouter, Router, Route, Switch,Routes } from 'react-router-dom';
import CreateEmploi from './Emploi/CreateEmploi';
import SystemeParam from './Sys_param/SystemParam';




function App() {
  return (
    
    <div>
  
      <BrowserRouter>
      
      <Routes>
        <Route index path='/' element={<Log_in/>}></Route>

        <Route path='tamplate' element={<Tamplate/>}></Route>
        <Route path='creatEmploi' element={<CreateEmploi/>}></Route>
        <Route path='systemParam' element={<SystemeParam/>}></Route>
      </Routes>
      </BrowserRouter>
      

    

    </div>
    
  );
}

export default App;

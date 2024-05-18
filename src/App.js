import Home from './Home/Home';
import Teachers from './Teacher/teachers_page/Teachers';

import { useState ,useEffect } from 'react';


import './App.css';

import PrintView from "./Emploi/PrintedFiles/PrintView"

import {BrowserRouter, Route, Switch,Routes } from 'react-router-dom';
import CreateEmploi from './Emploi/CreateEmploi';
import SystemeParam from './Sys_param/SystemParam';



import Loading from './loading';
  import Log_in from './loginPage/Log-in'
import Teacher_info from './Teacher/teacher_page/Teacher_info';
import EmploiIndividuel from './Emploi/PrintedFiles/EmploiIndividuel';
import PrintPreview from './Emploi/PrintedFiles/PrintView';

function App() {
  const [search,setSearch]=useState([])
  useEffect(()=>{
    console.log(search)
  },[search])
  return (
    
    <div>
      
      <BrowserRouter>
        <Routes>
        <Route path='/test' element={<Loading/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route index element={<Log_in/>}/>
      <Route path='teachers' element={<Teachers search={search} setSearch={setSearch}/>}/>
      <Route path='/teacher/:id' element={<Teacher_info search={search} setSearch={setSearch}/>}/>
        <Route path='creatEmploi' element={<CreateEmploi/>}></Route>
        <Route path='/systemParam' element={<SystemeParam/>}></Route>
        <Route path='/to-printed' element={<EmploiIndividuel/>}></Route>
        <Route path='/to-printView' element={<PrintView/>}></Route>
        </Routes>
      
      
      </BrowserRouter>
    </div>
    
  );
}

export default App;

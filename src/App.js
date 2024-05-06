import Home from './Home/Home';
import Teachers from './Teacher/teachers_page/Teachers';
import { Route , Routes } from 'react-router-dom';
import { useState ,useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router  } from 'react-router-dom';
import Loading from './loading';
import Teacher_info from './Teacher/teacher_page/Teacher_info';

function App() {
  const [search,setSearch]=useState([])
  useEffect(()=>{
    console.log(search)
  },[search])
  return (
    
    <div>
      <Router>
        <Routes>
        <Route path='/test' element={<Loading/>}/>
        <Route index element={<Home/>}/>
      <Route path='teachers' element={<Teachers search={search} setSearch={setSearch}/>}/>
      <Route path='/teacher/:id' element={<Teacher_info search={search} setSearch={setSearch}/>}/>
        </Routes>
      
      
      </Router>
    </div>
    
  );
}

export default App;

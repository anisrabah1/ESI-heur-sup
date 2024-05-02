import Home from './Home/Home';
import Teachers from './Teacher/Teachers';
import { Route , Routes } from 'react-router-dom';
import { useState ,useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router  } from 'react-router-dom';
import Loading from './loading';

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
        </Routes>
      
      
      </Router>
    </div>
    
  );
}

export default App;

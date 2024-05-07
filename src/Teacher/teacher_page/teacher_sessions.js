import { useState ,useEffect } from 'react';
import './teacher_sessions.css'
const Teacher_sessions = () => {
    const [session,set_session] = useState([{id:1},{id:2}]);
    useEffect(()=>{},[session])
    return ( 
        <div>
{session.map((m)=>(
              
              <div className="session">
                 Session {m.id}
              </div>
              
          )) }
          <center>
          <div className="addB" onClick={()=>{set_session([...session,{id:'undefined'}])}}/>
          </center>
          
        </div>
     );
}
 
export default Teacher_sessions;
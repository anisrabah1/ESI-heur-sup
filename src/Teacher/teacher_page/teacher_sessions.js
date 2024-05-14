import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import CreateEmploi from "../Emploi/CreateEmploi"
const Teacher_sessions = ({popup}) => {
    const [session,set_session] = useState([{id:1},{id:2}]);
    useEffect(()=>{})
    return ( 
        <div>
{session.map((m)=>(
              
              <div className="session">
                 Session {m.id}
                 <Teacher_dayOff popup={popup} />
                 <div>
                 <CreateEmploi/>
                 </div>
              </div>
              
          )) }
          <center>
          <div className="addB" onClick={()=>{set_session([...session,{id:'undefined'}])}}/>
          </center>
          
        </div>
     );
}
 
export default Teacher_sessions;
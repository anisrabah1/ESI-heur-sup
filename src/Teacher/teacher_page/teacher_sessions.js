import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import CreateEmploi from "../../Emploi/CreateEmploi"
const Teacher_sessions = ({popup,teacher_id}) => {
    const [session,set_session] = useState([{id:1},{id:2}]);
    useEffect(()=>{})
    return ( 
        <div>
{session && session.map((m)=>(
              
              <div className="session">
                 Session {m.id}
                 
                 <CreateEmploi sessionId={m.id}  teacherId={teacher_id}/>
                 
                 
              </div>
              
          )) }
          <center>
          <div className="addB" onClick={()=>{set_session([...session,{id:'undefined'}])}}/>
          </center>
          
        </div>
     );
}
 
export default Teacher_sessions;
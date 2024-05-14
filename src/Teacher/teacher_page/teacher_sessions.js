import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import CreateEmploi from "../Emploi/CreateEmploi"
import ApiUrls from '../../APIs';
const Teacher_sessions = ({sessionPopup,dayOffPopup,teacherID}) => {
    const [session,set_session] = useState([{id:1},{id:2}]);
    const apiUrls = new ApiUrls();
    const fetchData = async () => {
      
      try {
         console.log(`${apiUrls.getUrl('getAllSessions')}`);
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`);
          
          const data = await response.json();
          
          set_session(data.teachersessions)
          
        } catch (error) {
           console.log(error)
          
        }
  };

    useEffect(()=>{
      fetchData();
    },[])
    return ( 
        <div>
{session && session.map((m)=>(
              
              <div className="session">
                 Session {m.id}
                 <Teacher_dayOff popup={dayOffPopup} />
                 <Teacher_dayOff popup={dayOffPopup} />
                 <Teacher_dayOff popup={dayOffPopup} />
                 
              </div>
              
          )) }
          <center>
          <div className="addB" onClick={()=>{
            // set_session([...session,{id:'undefined'}])
            sessionPopup(true);
            }}/>
          </center>
          
        </div>
     );
}
 
export default Teacher_sessions;
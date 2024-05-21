import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from '../../APIs';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
const Teacher_sessions = ({sessionPopup,dayOffPopup,teacherID,sessionCreate}) => {
    const [session,set_session] = useState([]);
    const [currentSessionStart,set_currentSessionStart] = useState();
    const [currentSessionEnd,set_currentSessionEnd] = useState();
    window.currentSessionStart = currentSessionStart;
    window.set_currentSessionStart = set_currentSessionStart;
    window.currentSessionEnd = currentSessionEnd;
    window.set_currentSessionEnd = set_currentSessionEnd;
    const apiUrls = new ApiUrls();
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
         console.log(` api is here ${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`);
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          toaster.notify('session data' ,data.message); 
          console.log('sessins data',data.teacherSessions)
          
          set_session(data.teacherSessions)
          
        } catch (error) {
           console.log(error)
          
        }
  };

    useEffect(()=>{
      fetchData();
    },[])
    return ( 
        <div>
{session && session.map((m,i)=>(
              
              <div className="session">
                <div className="seesionHeader">
                  <div>Session   {i+1}</div>
                  <div>start    {m.startDate.substring(0, 10)}</div>
                  <div>end    {m.endDate.substring(0, 10)}</div>
                 </div>
                 {/* here is the emploi */}
                 
                 <Teacher_dayOff popup={dayOffPopup} create={sessionCreate} sessionID={m._id} seesionStart={m.startDate.substring(0, 10)} sessionEnd={m.endDate.substring(0, 10)}/>
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
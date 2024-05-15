import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from '../../APIs';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
const Teacher_sessions = ({sessionPopup,dayOffPopup,teacherID,sessionCreate}) => {
    const [session,set_session] = useState([]);
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
{session && session.map((m)=>(
              
              <div className="session">
                 Session {m._id}<br></br>
                 startDate {m.startDate}<br></br>
                 startDate {m.endDate}
                 {/* here is the emploi */}
                 <Teacher_dayOff popup={dayOffPopup} create={sessionCreate} sessionID={m._id}/>
                 <Teacher_dayOff popup={dayOffPopup} create={sessionCreate} sessionID={m._id}/>
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
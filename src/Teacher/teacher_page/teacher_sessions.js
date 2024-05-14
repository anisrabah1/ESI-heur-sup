import { useState ,useEffect } from 'react';
import './teacher_sessions.css';
import Teacher_dayOff from "./teacher_dayOff";
import CreateEmploi from "../Emploi/CreateEmploi"
import ApiUrls from '../../APIs';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
const Teacher_sessions = ({sessionPopup,dayOffPopup,teacherID,sessionCreate}) => {
    const [session,set_session] = useState([{id:1},{id:2}]);
    const apiUrls = new ApiUrls();
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
         console.log(`${apiUrls.getUrl('getAllSessions')}`);
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${teacherID}/teacherSessions`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          toaster.notify(data.message); 
          console.log('------------------------------------')
          console.log(data.teachersessions)
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
                 Session {m._id}<br></br>
                 startDate {m.startDate}<br></br>
                 startDate {m.endDate}
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
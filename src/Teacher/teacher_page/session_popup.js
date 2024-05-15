import { useState ,useEffect } from 'react';
import './popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ApiUrls from '../../APIs';
import Cookies from "js-cookie";
import { toaster } from 'evergreen-ui'

const Session_popup = ({set_close,teacherID}) => {


    const [GlobSessions,setGlobSessions] = useState ([{name:"globale seesion 1"},{name:'globale seesion 2'},{name:'globale seesion 3'}]);
    const apiUrls = new ApiUrls();
    const [selected , setSelected]= useState();
    


    const fetchSessions = async () => {
      const token = Cookies.get("token");
      try {
        
          const response = await fetch(`${apiUrls.getUrl('getGlobSessions')}`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });
          
          const data = await response.json();
         
          toaster.notify(data.message); 
          
          setGlobSessions(data.sessions );
        } catch (error) {
           
           toaster.notify(error); 
          
        }
  };
 
    const createSession = async (id) => {
      const token = Cookies.get("token");
      try {
         
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${id}/teacherSessions`,
        {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(selected)
        }

        );
        const data = await response.json();
        toaster.notify(data.message); 
          
          
          
          
        } catch (error) {
           
           toaster.notify(error); 
          
        }
        
  };
  useEffect(()=>{
    fetchSessions();
  },[])
  useEffect(()=>{},[])
    return ( 
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            {GlobSessions && GlobSessions.map((m)=>(
                <div className="formC textSession" onClick={()=>{
                  setSelected({session:`${m._id}`,
                    semester: "662d2b33e01ed9954a5feca4",
                });
                  console.log(selected);
                  createSession(teacherID);
                }}>{m.sessionName}</div>
            ))}
            
            
            </div>
    </div>
     );
}
 
export default Session_popup;
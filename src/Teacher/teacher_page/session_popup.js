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

const Session_popup = ({set_close}) => {


    const [GlobSessions,setGlobSessions] = useState ([{name:"globale seesion 1"},{name:'globale seesion 2'},{name:'globale seesion 3'}]);
    const apiUrls = new ApiUrls();
    const [selected , setSelected]= useState();
    


    const fetchSessions = async () => {
      
      try {
        console.log('succsee! glob');
          const response = await fetch(`${apiUrls.getUrl('getGlobSessions')}`);
          // console.log(response)
          const data = await response.json();
          setGlobSessions(data.sessions );
        } catch (error) {
           console.log(error)
          
        }
  };
 
    const createSession = async (id) => {
      
      try {
         
          const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${id}/teacherSessions`,
        {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify(selected)
        }
        );
          // console.log(response)
          
          
          
          console.log('succsee! glob');
        } catch (error) {
           console.log(error)
          
        }
        
  };
  useEffect(()=>{
    fetchSessions();
  },[selected])
  useEffect(()=>{},[GlobSessions])
    return ( 
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            {GlobSessions.map((m)=>(
                <div className="formC textSession">{m.sessionName}</div>
            ))}
            
            
            </div>
    </div>
     );
}
 
export default Session_popup;